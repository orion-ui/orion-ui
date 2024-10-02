import { Cropper } from 'vue-advanced-cropper';
import SharedSetupService from '../../Shared/SharedSetupService';
import { reactive, ref } from 'vue';
import { throttle } from 'lodash-es';

export type OrionCropperEmits = {}
export type OrionCropperProps = {
	// @doc props/circle define if the shape of the cropper is a circle (otherwise a square)
	// @doc/fr props/circle définit si le recadrage prend la forme d'unn cercle (un rectangle sinon)
	circle: boolean,
	// @doc props/cropHeight the height of the cropped image
	// @doc/fr props/cropHeight la hauteur de l'image recadrée
	cropHeight: number,
	// @doc props/cropWidth the width of the cropped image
	// @doc/fr props/cropWidth la largeur de l'image recadrée
	cropWidth: number,
	// @doc props/file the file
	// @doc/fr props/file le fichier à recadrer
	file: File,
	// @doc props/options options of the cropper
	// @doc/fr props/options les options du cropper
	options?: Object,
	// @doc props/zoomMax the maximum zoom
	// @doc/fr props/zoomMax le zoom maximum
	zoomMax: number,
	// @doc props/zoomMin the minimal zoom
	// @doc/fr props/zoomMin le zoom minimum
	zoomMin: number,
	// @doc props/zoomStep the step of the zoom
	// @doc/fr props/zoomStep le pas du zoom
	zoomStep: number,
};
type CropperType = InstanceType<typeof Cropper> & { coefficient: number };

export default class OrionCropperSetupService extends SharedSetupService {
	static readonly defaultProps = {
		circle: false,
		cropHeight: 300,
		cropWidth: 300,
		zoomMax: 3,
		zoomMin: 0.01,
		zoomStep: 0.01,
	};

	_cropper = ref<CropperType>();

	private state = reactive({
		zoom: 1,
		ready: false,
		image: null as Nullable<string>,
	});

	private zoomThrottled = throttle(() => {
		this._cropper.value?.zoom(this.state.zoom / this.currentZoom);
	}, 17);

	private get currentZoom () {
		return this.state.ready
			? 1 / (this._cropper.value?.coefficient ?? 1)
			: 1;
	}

	get cropperOptions () {
		return {
			imageRestriction: 'none',
			transitions: false,
			...this.props.options,
		};
	}

	get image () {
		return this.state.image;
	}

	get zoom () {
		return this.state.zoom;
	}

	set zoom (value) {
		this.state.zoom = value;
	}

	get publicInstance () {
		return {
			...super.publicInstance,
			crop: this.crop.bind(this),
		};
	}


	constructor (protected props: OrionCropperProps, protected emits: OrionCropperEmits) {
		super();
	}

	protected async onBeforeMount () {
		this.readFile();
	}


	private readFile () {
		if (this.props.file) {
			const reader = new FileReader();

			reader.addEventListener('load', () => {
				this.state.image = reader.result as string;
			}, false);

			reader.readAsDataURL(this.props.file as Blob);
		}
	}

	crop () {
		return new Promise<File>((resolve, reject) => {
			const res = this._cropper.value?.getResult();
			if (!res) return;

			const getResizedCanvas = (canvas: HTMLCanvasElement, maxWidth: number, maxHeight: number) => {
				if (!res || !this.document) return;

				const tmpCanvas = this.document.createElement('canvas');
				tmpCanvas.width = maxWidth;
				tmpCanvas.height = maxHeight;
				const croppedImg = res.coordinates;
				const croppedRatio = croppedImg.width / croppedImg.height;
				const canvasRatio = maxWidth / maxHeight;

				const drawW = (canvasRatio > croppedRatio)
					? Math.round((croppedImg.width * maxWidth) / croppedImg.height) * (maxHeight / maxWidth)
					: maxWidth;
				const drawX = (maxWidth - drawW) / 2;
				const drawH = (canvasRatio > croppedRatio)
					? maxHeight
					: Math.round((croppedImg.height * maxHeight) / croppedImg.width) * (maxWidth / maxHeight);
				const drawY = (maxHeight - drawH) / 2;

				const ctx = tmpCanvas.getContext('2d');
				ctx?.drawImage(
					canvas, 0, 0, croppedImg.width, croppedImg.height,
					drawX, drawY,
					drawW, drawH,
				);

				return tmpCanvas;
			};

			if (res.canvas) {
				const tmpCanvas = getResizedCanvas(res.canvas, this.props.cropWidth, this.props.cropHeight);

				tmpCanvas?.toBlob((blob) => {
					if (blob) {
						resolve(new File(
							[blob],
							typeof this.props.file === 'string'
								? 'cropped-img'
								: (this.props.file as File)?.name,
							{ type: blob.type },
						));
					} else {
						reject('No blob');
					}
				});
			}
		});
	}

	onReady () {
		this.state.ready = true;
		this.state.zoom = this.currentZoom;
	}

	zoomCropper () {
		this.zoomThrottled();
	}

	rotateCropper (angle: number) {
		this._cropper.value?.rotate(angle);
	}
}
