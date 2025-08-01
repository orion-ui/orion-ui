<template>
	<div
		v-if="setup.editor?.value"
		class="orion-editor"
		:class="{
			'orion-editor--error': setup.showError,
			'orion-editor--warning': setup.showWarning,
			'orion-editor--success': setup.showSuccess,
			'orion-editor--focused': setup.isFocus,
		}">
		<div class="orion-editor__toolbar">
			<orion-button
				v-if="!disableFeatures.includes('Undo')"
				v-tooltip="setup.lang.UNDO"
				size="sm"
				prefix-icon="undo"
				@click="setup.editor?.value?.chain().focus().undo().run()"/>
			<orion-button
				v-if="!disableFeatures.includes('Redo')"
				v-tooltip="setup.lang.REDO"
				size="sm"
				prefix-icon="redo"
				@click="setup.editor?.value?.chain().focus().redo().run()"/>

			<v-dropdown
				v-if="!disableFeatures.includes('FontSize')"
				theme="orion-editor-toolbar">
				<orion-button
					v-tooltip="setup.lang.ORION_EDITOR__FONT_SIZE"
					size="sm"
					prefix-icon="font"/>
				<template #popper>
					<orion-button
						size="xs"
						:class="{ 'active': setup.editor?.value.isActive('heading', { level: 1 }) }"
						@click="setup.editor?.value?.chain().focus().toggleHeading({ level: 1 }).run()">
						{{ setup.lang.ORION_EDITOR__TITLE_1 }}
					</orion-button>
					<orion-button
						size="xs"
						:class="{ 'active': setup.editor?.value.isActive('heading', { level: 2 }) }"
						@click="setup.editor?.value?.chain().focus().toggleHeading({ level: 2 }).run()">
						{{ setup.lang.ORION_EDITOR__TITLE_2 }}
					</orion-button>
					<orion-button
						size="xs"
						:class="{ 'active': setup.editor?.value.isActive('heading', { level: 3 }) }"
						@click="setup.editor?.value?.chain().focus().toggleHeading({ level: 3 }).run()">
						{{ setup.lang.ORION_EDITOR__TITLE_3 }}
					</orion-button>
					<orion-button
						size="xs"
						:class="{ 'active': setup.editor?.value.isActive('paragraph') }"
						@click="setup.editor?.value?.chain().focus().setParagraph().run()">
						{{ setup.lang.ORION_EDITOR__REGULAR_TEXT }}
					</orion-button>
				</template>
			</v-dropdown>

			<v-dropdown
				v-if="!disableFeatures.includes('TextColor')"
				theme="orion-editor-toolbar">
				<orion-button
					v-tooltip="setup.lang.ORION_EDITOR__TEXT_COLOR"
					size="sm"
					prefix-icon="swatches_palette"
					:class="{ 'active': setup.editor?.value.isActive('textColor') }"/>
				<template #popper>
					<orion-color-picker
						hide-rgba
						:start-value="setup.editor?.value?.getAttributes('textStyle').color"
						@picked="setup.editor?.value?.commands.setColor($event?.hex)"/>
					<orion-button
						style="border:none"
						size="xs"
						block
						nude
						@click="setup.editor?.value?.commands.unsetColor()">
						{{ setup.lang.RESET }}
					</orion-button>
				</template>
			</v-dropdown>

			<v-dropdown
				v-if="!disableFeatures.includes('BackgroundColor')"
				theme="orion-editor-toolbar">
				<orion-button
					v-tooltip="setup.lang.ORION_EDITOR__BACKGROUND_COLOR"
					size="sm"
					prefix-icon="rainbow"
					:class="{ 'active': setup.editor?.value.isActive('textBackground') }"/>
				<template #popper>
					<orion-color-picker
						hide-rgba
						:start-value="setup.editor?.value?.commands.getTextBackground()"
						@picked="setup.editor?.value?.commands.setTextBackground($event?.hex)"/>
					<orion-button
						style="border:none"
						size="xs"
						block
						nude
						@blur.stop
						@click="setup.editor?.value?.commands.unsetTextBackground()">
						{{ setup.lang.RESET }}
					</orion-button>
				</template>
			</v-dropdown>

			<orion-button
				v-if="!disableFeatures.includes('Bold')"
				v-tooltip="setup.lang.ORION_EDITOR__BOLD"
				size="sm"
				prefix-icon="bold"
				:class="{ 'active': setup.editor?.value.isActive('bold') }"
				@click="setup.editor?.value?.chain().focus().toggleBold().run()"/>
			<orion-button
				v-if="!disableFeatures.includes('Italic')"
				v-tooltip="setup.lang.ORION_EDITOR__ITALIC"
				size="sm"
				prefix-icon="italic"
				:class="{ 'active': setup.editor?.value.isActive('italic') }"
				@click="setup.editor?.value?.chain().focus().toggleItalic().run()"/>
			<orion-button
				v-if="!disableFeatures.includes('Underline')"
				v-tooltip="setup.lang.ORION_EDITOR__UNDERLINE"
				size="sm"
				prefix-icon="underline"
				:class="{ 'active': setup.editor?.value.isActive('underline') }"
				@click="setup.editor?.value?.chain().focus().toggleUnderline().run()"/>

			<v-dropdown
				v-if="!disableFeatures.includes('TextAlign')"
				theme="orion-editor-toolbar">
				<orion-button
					v-tooltip="setup.lang.ORION_EDITOR__ALIGN"
					size="sm"
					prefix-icon="text_align_center"/>
				<template #popper>
					<orion-button
						size="xs"
						:class="{ 'active': setup.editor?.value.isActive({ textAlign: 'left' }) }"
						@click="setup.editor?.value?.chain().focus().setTextAlign('left').run()">
						{{ setup.lang.ORION_EDITOR__ALIGN_LEFT }}
					</orion-button>
					<orion-button
						size="xs"
						:class="{ 'active': setup.editor?.value.isActive({ textAlign: 'center' }) }"
						@click="setup.editor?.value?.chain().focus().setTextAlign('center').run()">
						{{ setup.lang.ORION_EDITOR__ALIGN_CENTER }}
					</orion-button>
					<orion-button
						size="xs"
						:class="{ 'active': setup.editor?.value.isActive({ textAlign: 'right' }) }"
						@click="setup.editor?.value?.chain().focus().setTextAlign('right').run()">
						{{ setup.lang.ORION_EDITOR__ALIGN_RIGHT }}
					</orion-button>
				</template>
			</v-dropdown>

			<orion-button
				v-if="!disableFeatures.includes('BulletList')"
				v-tooltip="setup.lang.ORION_EDITOR__UNORDERED_LIST"
				size="sm"
				prefix-icon="list_unordered"
				:class="{ 'active': setup.editor?.value.isActive('bulletList') }"
				@click="setup.editor?.value?.chain().focus().toggleBulletList().run()"/>
			<orion-button
				v-if="!disableFeatures.includes('Link')"
				v-tooltip="setup.lang.ORION_EDITOR__LINK"
				size="sm"
				prefix-icon="link"
				:class="{ 'active': setup.editor?.value.isActive('link') }"
				@click="setup.setLinkAsync()"/>
			<orion-button
				v-if="!disableFeatures.includes('Link') && setup.editor?.value.isActive('link')"
				v-tooltip="setup.lang.ORION_EDITOR__UNLINK"
				size="sm"
				prefix-icon="link_break"
				@click="setup.editor?.value?.chain().focus().unsetLink().run()"/>

			<orion-button
				v-if="!disableFeatures.includes('ImageUrl')"
				v-tooltip="setup.lang.ORION_EDITOR__PICTURE_URL"
				size="sm"
				prefix-icon="image_01"
				@click="setup.promptImageUrlAsync()"/>

			<orion-button
				v-if="!disableFeatures.includes('ImageBase64')"
				v-tooltip="setup.lang.ORION_EDITOR__PICTURE"
				size="sm"
				prefix-icon="camera"
				@click="setup.promptImageAsync()"/>

			<orion-button
				v-if="!disableFeatures.includes('YouTube')"
				v-tooltip="setup.lang.ORION_EDITOR__YOUTUBE"
				size="sm"
				prefix-icon="play"
				@click="setup.promptYouTubeAsync()"/>
		</div>

		<editor-content
			:ref="setup._input"
			class="orion-editor__content"
			:editor="setup.editor?.value"/>
	</div>
</template>

<script setup lang="ts">
import './OrionEditor.less';
import { EditorContent } from '@tiptap/vue-3';
import { OrionButton } from 'packages/Button';
import { OrionColorPicker } from 'packages/ColorPicker';
import { JSONContent } from '@tiptap/vue-3';
import OrionEditorSetupService from './OrionEditorSetupService';
import type { OrionEditorProps, OrionEditorEmits } from './OrionEditorSetupService';
const emits = defineEmits<OrionEditorEmits>() as OrionEditorEmits;
const vModel = defineModel<Nil<string>>();
const json = defineModel<JSONContent | undefined >('json');
const props = withDefaults(defineProps<OrionEditorProps>(), OrionEditorSetupService.defaultProps);
const setup = new OrionEditorSetupService(props, emits, vModel, json);
defineExpose(setup.publicInstance);

/** Doc
 * @doc vModel/json the json format of the editor value
 * @doc/fr vModel/json valeur de l'éditeur au format JSON
 */
</script>
