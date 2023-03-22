<template>
	<div
		v-if="setup.editor.value"
		class="orion-editor"
		:class="{
			'orion-editor--error': setup.showError,
			'orion-editor--success': setup.showSuccess,
			'orion-editor--focused': setup.isFocus,
		}">
		<div class="orion-editor__toolbar">
			<orion-button
				size="xs"
				@click="setup.editor.value?.chain().focus().undo().run()">
				<img
					src="~./editor/icons/arrows-round-left.svg"
					:alt="setup.lang.UNDO">
			</orion-button>
			<orion-button
				size="xs"
				@click="setup.editor.value?.chain().focus().redo().run()">
				<img
					src="~./editor/icons/arrows-round-right.svg"
					:alt="setup.lang.REDO">
			</orion-button>

			<v-dropdown theme="orion-editor-toolbar">
				<orion-button size="xs">
					<img
						src="~./editor/icons/text-formatting-font-size.svg"
						:alt="setup.lang.ORION_EDITOR__FONT_SIZE">
				</orion-button>
				<template #popper>
					<orion-button
						size="xs"
						:class="{ 'active': setup.editor.value.isActive('heading', { level: 1 }) }"
						@click="setup.editor.value?.chain().focus().toggleHeading({ level: 1 }).run()">
						{{ setup.lang.ORION_EDITOR__TITLE_1 }}
					</orion-button>
					<orion-button
						size="xs"
						:class="{ 'active': setup.editor.value.isActive('heading', { level: 2 }) }"
						@click="setup.editor.value?.chain().focus().toggleHeading({ level: 2 }).run()">
						{{ setup.lang.ORION_EDITOR__TITLE_2 }}
					</orion-button>
					<orion-button
						size="xs"
						:class="{ 'active': setup.editor.value.isActive('heading', { level: 3 }) }"
						@click="setup.editor.value?.chain().focus().toggleHeading({ level: 3 }).run()">
						{{ setup.lang.ORION_EDITOR__TITLE_3 }}
					</orion-button>
					<orion-button
						size="xs"
						:class="{ 'active': setup.editor.value.isActive('paragraph') }"
						@click="setup.editor.value?.chain().focus().setParagraph().run()">
						{{ setup.lang.ORION_EDITOR__REGULAR_TEXT }}
					</orion-button>
				</template>
			</v-dropdown>

			<v-dropdown theme="orion-editor-toolbar">
				<orion-button
					size="xs"
					:class="{ 'active': setup.editor.value.isActive('textColor') }">
					<img
						src="~./editor/icons/text-formatting-text.svg"
						:alt="setup.lang.ORION_EDITOR__TEXT_COLOR">
				</orion-button>
				<template #popper>
					<orion-color-picker
						hide-rgba
						:start-value="setup.editor.value?.getAttributes('textStyle').color"
						@picked="setup.editor.value?.commands.setColor($event?.hex)"/>
					<orion-button
						style="border:none"
						size="xs"
						block
						nude
						@click="setup.editor.value?.commands.unsetColor()">
						{{ setup.lang.RESET }}
					</orion-button>
				</template>
			</v-dropdown>

			<v-dropdown theme="orion-editor-toolbar">
				<orion-button
					size="xs"
					:class="{ 'active': setup.editor.value.isActive('textBackground') }">
					<img
						src="~./editor/icons/text-formatting-text-square.svg"
						:alt="setup.lang.ORION_EDITOR__BACKGROUND_COLOR">
				</orion-button>
				<template #popper>
					<orion-color-picker
						hide-rgba
						:start-value="setup.editor.value?.commands.getTextBackground()"
						@picked="setup.editor.value?.commands.setTextBackground($event?.hex)"/>
					<orion-button
						style="border:none"
						size="xs"
						block
						nude
						@blur.stop
						@click="setup.editor.value?.commands.unsetTextBackground()">
						{{ setup.lang.RESET }}
					</orion-button>
				</template>
			</v-dropdown>

			<orion-button
				size="xs"
				:class="{ 'active': setup.editor.value.isActive('bold') }"
				@click="setup.editor.value?.chain().focus().toggleBold().run()">
				<img
					src="~./editor/icons/text-formatting-bold.svg"
					:alt="setup.lang.ORION_EDITOR__BOLD">
			</orion-button>
			<orion-button
				size="xs"
				:class="{ 'active': setup.editor.value.isActive('italic') }"
				@click="setup.editor.value?.chain().focus().toggleItalic().run()">
				<img
					src="~./editor/icons/text-formatting-italic.svg"
					:alt="setup.lang.ORION_EDITOR__ITALIC">
			</orion-button>
			<orion-button
				size="xs"
				:class="{ 'active': setup.editor.value.isActive('underline') }"
				@click="setup.editor.value?.chain().focus().toggleUnderline().run()">
				<img
					src="~./editor/icons/text-formatting-underline.svg"
					:alt="setup.lang.ORION_EDITOR__UNDERLINE">
			</orion-button>

			<v-dropdown theme="orion-editor-toolbar">
				<orion-button size="xs">
					<img
						src="~./editor/icons/text-formatting-left-align-2.svg"
						:alt="setup.lang.ORION_EDITOR__ALIGN">
				</orion-button>
				<template #popper>
					<orion-button
						size="xs"
						:class="{ 'active': setup.editor.value.isActive({ textAlign: 'left' }) }"
						@click="setup.editor.value?.chain().focus().setTextAlign('left').run()">
						{{ setup.lang.ORION_EDITOR__ALIGN_CENTER }}
					</orion-button>
					<orion-button
						size="xs"
						:class="{ 'active': setup.editor.value.isActive({ textAlign: 'center' }) }"
						@click="setup.editor.value?.chain().focus().setTextAlign('center').run()">
						{{ setup.lang.ORION_EDITOR__ALIGN_LEFT }}
					</orion-button>
					<orion-button
						size="xs"
						:class="{ 'active': setup.editor.value.isActive({ textAlign: 'right' }) }"
						@click="setup.editor.value?.chain().focus().setTextAlign('right').run()">
						{{ setup.lang.ORION_EDITOR__ALIGN_RIGHT }}
					</orion-button>
				</template>
			</v-dropdown>

			<orion-button
				size="xs"
				:class="{ 'active': setup.editor.value.isActive('bulletList') }"
				@click="setup.editor.value?.chain().focus().toggleBulletList().run()">
				<img
					src="~./editor/icons/text-formatting-list-bullets.svg"
					:alt="setup.lang.ORION_EDITOR__UNORDERED_LIST">
			</orion-button>
			<orion-button
				size="xs"
				:class="{ 'active': setup.editor.value.isActive('link') }"
				@click="setup.setLinkAsync()">
				<img
					src="~./editor/icons/link.svg"
					:alt="setup.lang.ORION_EDITOR__LINK">
			</orion-button>
			<orion-button
				v-if="setup.editor.value.isActive('link')"
				size="xs"
				@click="setup.editor.value?.chain().focus().unsetLink().run()">
				<img
					src="~./editor/icons/unlink.svg"
					:alt="setup.lang.ORION_EDITOR__UNLINK">
			</orion-button>

			<orion-button
				size="xs"
				@click="setup.promptImageAsync()">
				<img
					src="~./editor/icons/image-camera-1.svg"
					:alt="setup.lang.ORION_EDITOR__PICTURE">
			</orion-button>
		</div>

		<editor-content
			:ref="setup._input"
			class="orion-editor__content"
			:editor="setup.editor.value"
			:name="name"/>
	</div>
</template>

<script setup lang="ts">
import './OrionEditor.less';
import { EditorContent, JSONContent } from '@tiptap/vue-3';
import { OrionButton } from 'packages/Button';
import { OrionColorPicker } from 'packages/ColorPicker';
import OrionEditorSetupService from './OrionEditorSetupService';
type VModelType = string | null | undefined;
type EditorEmit = {
  (e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'input', payload: VModelType): void;
  (e: 'change', val?: VModelType): void;
  (e: 'update:modelValue', payload: VModelType): void;
  (e: 'clear'): void;
	(e: 'update:json', payload: JSONContent | undefined): void;
}
const emit = defineEmits<EditorEmit>();
const props = defineProps(OrionEditorSetupService.props);
const setup = new OrionEditorSetupService(props, emit);
defineExpose(setup.publicInstance);

/** Doc
 * @doc event/focus/desc emitted on focus
 * @doc/fr event/focus/desc émis lors du focus
 *
 * @doc event/blur/desc emitted when the focus leaves the field
 * @doc/fr event/blur/desc émis quand le focus quitte le champ
 *
 * @doc event/input/desc emitted when the value of the field changes
 * @doc/fr event/input/desc émis lorsque la valeur est modifiée
 *
 * @doc event/change/desc emitted when the value of the field changes
 * @doc/fr event/change/desc émis lorsque la valeur est modifiée
 *
 * @doc event/update:modelValue/desc emitted to update the field value
 * @doc/fr event/update:modelValue/desc émis pour mettre à jour la valeur
 *
 * @doc event/clear/desc emitted when the field is cleared
 * @doc/fr event/clear/desc émis quand le champ est vidé
 *
 * @doc event/update:json/desc emitted to update the json value
 * @doc/fr event/update:json/desc émis pour mettre à jour la valeur JSON
 */
</script>
