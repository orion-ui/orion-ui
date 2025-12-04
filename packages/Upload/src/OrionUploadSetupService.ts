import anime from 'animejs';
import { useNotif } from 'services/NotifService';
import { ModelRef, reactive, ref, useTemplateRef } from 'vue';
import SharedFieldSetupService, { SharedFieldSetupServiceEmits, SharedFieldSetupServiceProps } from '../../Shared/SharedFieldSetupService';

export type OrionUploadEmits = SharedFieldSetupServiceEmits<Nil<File[]>> & {}
export type OrionUploadProps = SharedFieldSetupServiceProps & {
	// @doc props/fileMaxSize the maximal size of the uploaded file (Mo)
	// @doc/fr props/fileMaxSize taille maximale d'un fichier (Mo)
	fileMaxSize?: number,
	// @doc props/fileTypes Missing @doc
	// @doc/fr props/fileTypes Missing @doc
	fileTypes?: string[],
	// @doc props/multiple allows multiple files upload.
	// @doc/fr props/multiple permet le chargement de plusieurs fichiers.
	multiple?: boolean,
	// @doc props/showPreview shows a preview of the selected file
	// @doc/fr props/showPreview montre un apperçu du fichier chargé
	showPreview?: boolean,
};

export default class OrionUploadSetupService extends SharedFieldSetupService<OrionUploadProps, File[]> {
	static readonly defaultProps = {
		...SharedFieldSetupService.defaultProps,
		fileMaxSize: 4,
		fileTypes: () => ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
		showPreview: true,
	};

	_input = ref<HTMLInputElement>();
	_bubble = ref<RefDom>();
	_illustration = ref<RefDom>();
	_filePreview = useTemplateRef<HTMLElement[]>('previews');

	uid = this.getUid();

	private imgFileType = ['image/jpeg', 'image/png'];

	protected state = reactive({
		...this.sharedState,
		isDraggingOver: false,
		dragCounter: 0,
	});

	private readonly preventDrop = (e: DragEvent) => {
		e.preventDefault();
	};

	get isDraggingOver () {
		return this.state.isDraggingOver;
	}

	get label () {
		return (this.props.label ?? this.lang.ORION_UPLOAD__LABEL)
			.replace('$fileMaxSize', this.props.fileMaxSize.toString())
			.replace('$format', this.props.fileTypes
				.map(x => x.split('/')[1]?.toUpperCase())
				.join(', '),
			);
	}

	get cssClass () {
		const baseClass = `orion-upload`;
		const cls = [
			`${baseClass}--${this.props.size}`,
			{ 'orion-upload--drag-over': this.isDraggingOver },
		];

		if (this.showError) cls.push(`${baseClass}--error`);
		if (this.showWarning) cls.push(`${baseClass}--warning`);
		if (this.showSuccess) cls.push(`${baseClass}--success`);
		if (this.props.clearable) cls.push(`${baseClass}--clearable`);
		if (this.isFocus) cls.push(`${baseClass}--focused`);
		if (this.props.disabled) cls.push(`${baseClass}--disabled`);
		if (this.props.required) cls.push(`${baseClass}--required`);
		if (this.props.readonly) cls.push(`${baseClass}--readonly`);

		return cls;
	}

	protected get hasValue (): boolean {
		return this.vModel.value !== null && this.vModel.value !== undefined && !!this.vModel.length;
	}

	constructor (
		protected props: OrionUploadProps & Omit<typeof OrionUploadSetupService.defaultProps, 'fileTypes'> & { fileTypes: string[]},
		protected emits: OrionUploadEmits,
		protected vModel: ModelRef<File[] | undefined>,
	) {
		super(props, emits, vModel);
	}

	protected onBeforeUpdate () {
		if (this._filePreview.value)
			this._filePreview.value.length = 0;
	}

	protected onMounted () {
		this.vModel.value?.forEach((file, index) => this.getFilePreview(file, index));

		this.window?.addEventListener('dragover', this.preventDrop);
		this.window?.addEventListener('drop', this.preventDrop);
	}

	protected onUnmounted () {
		this.window?.removeEventListener('dragover', this.preventDrop);
		this.window?.removeEventListener('drop', this.preventDrop);
	}


	private fileIsValid (file: File) {
		if (file.size / 1000000 > this.props.fileMaxSize) {
			useNotif.danger(this.lang.ERROR, this.lang.ORION_UPLOAD__FILE_TOO_HEAVY.replace('$fileMaxSize', this.props.fileMaxSize.toString()));
			return false;
		} else if (file.type && this.props.fileTypes.includes(file.type)) {
			return true;
		} else {
			useNotif.danger(this.lang.ERROR, this.lang.ORION_UPLOAD__INVALID_FILE_TYPE);
			return false;
		}
	}

	private emitInput () {
		if (!this.vModel.value) return;
		if (!this.props.multiple && this.vModel.value.length > 1) {
			this.vModel.value.splice(1, this.vModel.value.length);
		}
		this.vModel.value.forEach((file, index) => this.getFilePreview(file, index));
		this.emits('change', this.vModel.value);
	}

	private getFilePreview (file: File, index: number) {
		if (!this.props.showPreview) return;
		const delay = this._illustration.value ? 600 : 0;
		// setTimeout à cause de la transition css
		setTimeout(() => {
			if (this.imgFileType.includes(file.type)) {
				const reader = new FileReader();
				reader.addEventListener('load', () => {
					const target = this._filePreview.value?.[index]?.firstChild as HTMLElement;
					if (target) target.style.backgroundImage = `url(${reader.result})`;
				}, false);

				reader.readAsDataURL(file);
			}
		}, delay);

	}

	clear () {
		if (this.vModel.value)
			this.vModel.value.length = 0;

		this.emits('change', []);
		this.emits('clear');
	}

	handleDragEnter (e: DragEvent) {
		e.preventDefault();
		this.state.dragCounter++;
		this.state.isDraggingOver = true;
	}

	handleDragLeave (e: DragEvent) {
		e.preventDefault();
		this.state.dragCounter--;
		if (this.state.dragCounter === 0) {
			this.state.isDraggingOver = false;
		}
	}

	handleDragOver (e: DragEvent) {
		anime({
			targets: this._bubble.value,
			scale: 1,
			translateX: e.x - (e.target as HTMLElement)?.getBoundingClientRect().x,
			translateY: e.y - (e.target as HTMLElement)?.getBoundingClientRect().y,
			easing: 'easeOutSine',
			duration: 100,
		});
	}

	handleChange () {
		if (!this.vModel.value) return;
		this.vModel.value.length = 0;
		if (this._input.value?.files?.length) {
			for (const file of this._input.value.files) {
				if (this.fileIsValid(file)) this.vModel.value.push(file);
			}
			this.emitInput();
		}
	}

	clickInput () {
		this._input.value?.click();
		setTimeout(() => this.setHasBeenFocus(true), 600);
	}

	deleteFile (index: number) {
		if (!this.vModel.value) return;


		if (this._input.value) this._input.value.value = '';
		this.vModel.value.splice(index, 1);
		this.emitInput();
	}

	handleDrop (ev: DragEvent) {
		if (!this.vModel.value) return;
		if (!this.props.multiple) this.vModel.value.length = 0;
		this.setHasBeenFocus(true);
		ev.preventDefault();

		if (ev.dataTransfer?.items) {
			for (let i = 0; i < (this.props.multiple ? ev.dataTransfer.items.length : 1); i++) {
				if (ev.dataTransfer.items[i].kind === 'file') {
					const file = ev.dataTransfer.items[i].getAsFile();
					if (file && this.fileIsValid(file)) this.vModel.value.push(file);
				}
			}
		} else if (ev.dataTransfer?.files?.length) {
			for (let p = 0; p < (this.props.multiple ? ev.dataTransfer.files.length : 1); p++) {
				if (this.fileIsValid(ev.dataTransfer.files[p])) this.vModel.value.push(ev.dataTransfer.files[p]);
			}
		}

		this.emitInput();
		this.state.dragCounter = 0;
		this.state.isDraggingOver = false;
	}

	animIllustration () {
		if (!this._illustration.value || !this.document) return;

		anime({
			targets: this.document.getElementById(`file-${this.uid}`)?.getElementsByTagName('rect'),
			opacity: [0, 1],
			scale: [0, 1],
			duration: 400,
			easing: 'easeOutQuad',
			delay: anime.stagger(40),
		});
	}
}
