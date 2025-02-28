import { ModelRef, reactive, ShallowRef } from 'vue';
import { Editor, JSONContent, useEditor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Color from '@tiptap/extension-color';
import Youtube from '@tiptap/extension-youtube';

import TextBackground from './editor/extensions/text-background';

import SharedFieldSetupService, { SharedFieldSetupServiceEmits, SharedFieldSetupServiceProps } from '../../Shared/SharedFieldSetupService';
import usePrompt from 'services/PromptService';
import useNotif from 'services/NotifService';

export type OrionEditorEmits = SharedFieldSetupServiceEmits<Nil<string>> & {}
export type OrionEditorProps = SharedFieldSetupServiceProps & {
	// @doc props/disableFeatures disable some editor's features
	// @doc/fr props/disableFeatures désactive des fonctions de l'éditeur
	disableFeatures?: EditorFeature[],
	// @doc props/imgFileTypes authorized image file formats
	// @doc/fr props/imgFileTypes type de fichier autorisé pour les images
	imgFileTypes?: string[],
	// @doc props/imgMaxSize maximum size of the imported image
	// @doc/fr props/imgMaxSize taille maximum d'une image importée
	imgMaxSize?: number,
	// @doc props/placeholder place holder
	// @doc/fr props/placeholder placeholder
	placeholder?: string,
};

type EditorFeature =
	| 'Undo'
	| 'Redo'
	| 'FontSize'
	| 'TextColor'
	| 'BackgroundColor'
	| 'Bold'
	| 'Italic'
	| 'Underline'
	| 'TextAlign'
	| 'BulletList'
	| 'Link'
	| 'ImageUrl'
	| 'ImageBase64'
	| 'YouTube'

export default class OrionEditorSetupService extends SharedFieldSetupService<OrionEditorProps, string | null | undefined> {
	static readonly defaultProps = {
		...SharedFieldSetupService.defaultProps,
		disableFeatures: () => [],
		imgFileTypes: () => ['image/jpeg', 'image/png', 'image/gif'],
		imgMaxSize: 1500,
	};



	protected state = reactive({
		...this.sharedState,
		image: [] as File[],
	});

	editor?: ShallowRef<Editor | undefined>;

	get hasValue () {
		return this.sanitizeHtml(this.vModel?.value).length > 0;
	}

	// @doc vModel/json the json format of the editor value
	// @doc/fr vModel/json valeur de l'éditeur au format JSON
	constructor (
		protected props: OrionEditorProps
			& Omit<typeof OrionEditorSetupService.defaultProps, 'disableFeatures' | 'imgFileTypes'>
			& { disableFeatures: EditorFeature[], imgFileTypes:string[] },
		protected emits: OrionEditorEmits,
		protected vModel: ModelRef<Nil<string>>,
		protected json?: ModelRef<JSONContent | undefined>) {
		super(props, emits, vModel);

		this.editor = useEditor({
			content: this.vModel?.value,
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
				if (!this.sanitizeHtml(this.vModel?.value).length && this.json?.value) {
					editor.commands.setContent(this.json.value, true);
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
				if (this.vModel.value) {
					this.vModel.value = editor.getHTML();
				}
				if (this.json?.value) {
					this.json.value = editor.getJSON();
				}
			},
		});
	}

	private sanitizeHtml (html?: string | null) {
		return html?.replace(/<[^>]+>/g, '').trim() ?? '';
	}

	async setLinkAsync () {
		const { value: url, confirm } = await usePrompt<string>({ title: this.lang.ORION_EDITOR__LINK_URL });

		if (confirm && url) {
			this.editor?.value?.chain().focus().setLink({ href: url }).run();
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
				if (!!src) this.editor?.value?.chain().focus().setImage({ src }).run();
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
			this.editor?.value?.chain().focus().setImage({ src: value }).run();
		}
	}

	async promptYouTubeAsync () {
		const { confirm, value } = await usePrompt<string>({
			title: this.lang.ORION_EDITOR__YOUTUBE,
			prompt: { fieldProps: { label: this.lang.ORION_EDITOR__ADD_YOUTUBE_LABEL } },
		});

		if (confirm && value?.length) {
			this.editor?.value?.chain().focus().setYoutubeVideo({ src: value }).run();
		}
	}
}
