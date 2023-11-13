import { PropType, reactive } from 'vue';
import { JSONContent, useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Color from '@tiptap/extension-color';
import Youtube from '@tiptap/extension-youtube';

import TextBackground from './editor/extensions/text-background';

import SharedFieldSetupService, { FieldEmit } from '../../Shared/SharedFieldSetupService';
import usePrompt from 'services/PromptService';
import useNotif from 'services/NotifService';

type Props = SetupProps<typeof OrionEditorSetupService.props>

type EditorEmit = FieldEmit<string | null | undefined> & {
	(e: 'update:json', payload: JSONContent | undefined): void;
}

export default class OrionEditorSetupService extends SharedFieldSetupService<Props, string | null | undefined> {
	static props = {
		...SharedFieldSetupService.props,
		// eslint-disable-next-line max-len
		// @doc props/allowImgToBase64 Allows uploading an image from the hard drive. Use with caution as it significantly increases the request payload size (if stored in the database)
		// eslint-disable-next-line max-len
		// @doc/fr props/allowImgToBase64 autorise l'upload d'une image depuis le disque dur. Utiliser avec prudence car augmente considérablement le poids de la requête (si stocké en BDD)
		allowImgToBase64: Boolean,
		// @doc props/json the json format of the editor value
		// @doc/fr props/json valeur de l'éditeur au format JSON
		json: {
			type: Object as PropType<JSONContent>,
			default: undefined,
		},
		// @doc props/placeholder place holder
		// @doc/fr props/placeholder placeholder
		placeholder: {
			type: String,
			default: undefined,
		},
		// @doc props/config configuration of the editor
		// @doc/fr props/config configuration de l'éditeur
		config: {
			type: Object,
			default: () => ({}),
		},
		// @doc props/imgMaxSize maximum size of the imported image
		// @doc/fr props/imgMaxSize taille maximum d'une image importée
		imgMaxSize: {
			type: Number,
			default: 1500,
		},
		// @doc props/imgFileTypes authorized image file formats
		// @doc/fr props/imgFileTypes type de fichier autorisé pour les images
		imgFileTypes: {
			type: Array as PropType<string[]>,
			default: () => ['image/jpeg', 'image/png', 'image/gif'],
		},
	};

	protected emit: EditorEmit;

	protected state = reactive({
		...this.sharedState,
		image: [] as File[],
	});

	editor = useEditor({
		content: this.vModel,
		extensions: [
			StarterKit,
			Underline,
			Image.configure({ allowBase64: true }),
			Link.configure({ openOnClick: false }),
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			Color.configure({ types: ['textStyle'] }),
			TextStyle,
			TextBackground,
			Youtube,
		],
		onCreate: ({ editor }) => {
			if (!this.sanitizeHtml(this.vModel).length && this.vModelJson) {
				editor.commands.setContent(this.vModelJson, true);
			}
		},
		onFocus: () => {
			this.state.isFocus = true;
			this.state.hasBeenFocus = true;
		},
		onBlur: () => {
			this.state.isFocus = false;
		},
		onUpdate: ({ editor }) => {
			this.vModel = editor.getHTML();
			this.vModelJson = editor.getJSON();
		},
	});

	get hasValue () {
		return this.sanitizeHtml(this.vModel).length > 0;
	}

	get vModelJson () {
		return this.props.json;
	}

	set vModelJson (val) {
		this.emit('update:json', val);
	}


	constructor (props: Props, emit: EditorEmit) {
		super(props, emit);
		this.emit = emit;
	}


	private sanitizeHtml (html?: string | null) {
		return html?.replace(/<[^>]+>/g, '').trim() ?? '';
	}

	async setLinkAsync () {
		const { value: url, confirm } = await usePrompt<string>({ title: this.lang.ORION_EDITOR__LINK_URL });

		if (confirm && url) {
			this.editor.value?.chain().focus().setLink({ href: url }).run();
		}
	}

	async promptImageAsync () {
		const { confirm, value } = await usePrompt<File[]>({
			title: this.lang.ORION_EDITOR__ADD_PICTURE,
			prompt: {
				type: 'upload',
				value: this.state.image,
				fieldProps: {
					fileMaxSize: this.props.imgMaxSize / 1000,
					fileTypes: this.props.imgFileTypes,
				},
			},
		});

		if (confirm && value?.length) {
			try {
				const src = await this.imageToBase64(value[0]);
				if (!!src) this.editor.value?.chain().focus().setImage({ src }).run();
				this.state.image.length = 0;
			} catch (e: any) {
				useNotif.danger(e);
			}
		}
	}

	private imageToBase64 (file: File): Promise<Nullable<string>> {
		return new Promise((resolve, reject) => {
			if (this.props.imgMaxSize && file.size / 1000 > this.props.imgMaxSize) {
				reject(this.lang.ORION_EDITOR__PICTURE_TOO_HEAVY
					.replace('$fileName', file.name)
					.replace('$imgMaxSize', this.props.imgMaxSize.toString()),
				);
				return;
			}

			const reader = new FileReader();
			reader.addEventListener('load', () => {
				resolve(reader.result as Nullable<string>);
			}, false);

			reader.readAsDataURL(file);
		});
	}

	async promptImageUrlAsync () {
		const { confirm, value } = await usePrompt<string>({
			title: this.lang.ORION_EDITOR__ADD_PICTURE,
			prompt: { fieldProps: { label: this.lang.ORION_EDITOR__ADD_PICTURE_LABEL } },
		});

		if (confirm && value?.length) {
			this.editor.value?.chain().focus().setImage({ src: value }).run();
		}
	}

	async promptYouTubeAsync () {
		const { confirm, value } = await usePrompt<string>({
			title: this.lang.ORION_EDITOR__YOUTUBE,
			prompt: { fieldProps: { label: this.lang.ORION_EDITOR__ADD_YOUTUBE_LABEL } },
		});

		if (confirm && value?.length) {
			this.editor.value?.chain().focus().setYoutubeVideo({ src: value }).run();
		}
	}
}
