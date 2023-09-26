<template>
	<div
		class="orion-upload"
		:class="{ 'orion-upload--drag-over' : setup.isDraggingOver }"
		@mouseenter.prevent="setup.animIllustration()"
		@dragenter.prevent="setup.handleDragEnter($event)"
		@dragleave.prevent="setup.handleDragLeave($event)"
		@dragover.prevent="setup.handleDragOver($event)"
		@drop="setup.handleDrop($event)">
		<input
			:ref="setup._input"
			class="orion-upload__input"
			type="file"
			:multiple="multiple"
			:accept="fileTypes.join(',')"
			@change="setup.handleChange()">

		<transition
			name="scale"
			mode="out-in">
			<div
				v-if="!setup.vModel?.length"
				:ref="setup._illustration"
				key="emptyFiles"
				class="orion-upload__wrapper">
				<div class="orion-upload__content">
					<div class="orion-upload__label">
						<slot>{{ setup.label }}</slot>
					</div>

					<div class="orion-upload__or">{{ setup.lang.OR }}</div>

					<div class="orion-upload__drag-over-indicator">
						<orion-icon icon="cloud_upload"/>
					</div>
					<orion-button
						class="orion-upload__button"
						color="info"
						outline
						@click="setup.clickInput()">
						{{ setup.lang.ORION_UPLOAD__BUTTON }}
					</orion-button>
				</div>
			</div>

			<div
				v-else-if="setup.vModel.length"
				key="filledFiles"
				class="orion-upload__files-list">
				<div
					v-for="(file, i) in setup.vModel"
					:key="i"
					:ref="el => setup.setFilePreviewRef(el)"
					class="orion-upload__files-list-item">
					<div
						v-if="showPreview"
						class="orion-upload__files-list-item-preview">
						<svg
							v-if="setup.vModel.length === 1 && setup.vModel[0].type === 'application/pdf'"
							viewBox="0 0 80 80"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink">
							<defs>
								<linearGradient
									id="linearGradient-1"
									x1="27.21875%"
									y1="0%"
									x2="72.78125%"
									y2="100%">
									<stop
										stop-color="#F883A8"
										offset="0%"/>
									<stop
										stop-color="#FA1E4A"
										offset="100%"/>
								</linearGradient>
							</defs>
							<g
								stroke="none"
								stroke-width="1"
								fill="none"
								fill-rule="evenodd">
								<rect
									stroke="#717A8E"
									stroke-width="1"
									fill="url(#linearGradient-1)"
									x="14"
									y="1"
									width="52"
									height="78"
									rx="4"/>
								<text
									font-family="SourceSansPro-Bold, Source Sans Pro"
									font-size="22"
									font-weight="bold"
									line-spacing="30"
									fill="#FFFFFF">
									<tspan
										x="20.695"
										y="65">PDF</tspan>
								</text>
								<g
									transform="translate(24.000000, 5.000000)"
									stroke="#FFFFFF"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5">
									<path
										id="pdfPreviewPath"
										d="M7.52752442,11.4211418 C5.94709274,8.87248676 9.72824303,6.52939779 10.716245,9.14354286 C12.4081054,
										13.6314314 15.1288251,25.7725617 8.99095586,34.0243098 C7.27866678,36.3237387 3.58480238,34.1461941 5.57194914,
										31.7503492 C11.3309605,25.095831 19.8088343,21.2883115 28.7157089,21.3556207 C31.8134293,21.4702283 31.6537147,
										25.7798384 28.8828521,25.4487497 C19.9165488,24.3008544 12.0162475,19.1107668 7.52752442,11.4211418 Z"/>
								</g>
							</g>
						</svg>
					</div>
					<div class="orion-upload__files-list-item-infos">
						<span class="orion-upload__files-list-item-name">{{ file.name }}</span><br>
						<span class="orion-upload__files-list-item-type">{{ file.type }}</span><br>
						<span class="orion-upload__files-list-item-size">{{ Math.floor(file.size / 1000) }} Ko</span>
					</div>

					<orion-icon
						ripple="danger"
						icon="trash_full"
						class="orion-upload__delete-file"
						@click="setup.deleteFile(i)"/>
				</div>
			</div>
			<div
				v-else
				class="orion-upload__pending">
				<orion-loader
					visible
					size="sm"
					:message="setup.lang.ORION_UPLOAD__PROCESSING"/>
			</div>
		</transition>

		<div
			:ref="setup._bubble"
			class="orion-upload__bubble"/>
	</div>
</template>

<script setup lang="ts">
import './OrionUpload.less';
import { OrionButton } from 'packages/Button';
import { OrionIcon } from 'packages/Icon';
import { OrionLoader } from 'packages/Loader';
import OrionUploadSetupService from './OrionUploadSetupService';
type VModelType = Nil<File[]>;
type FieldEmit = {
  (e: 'focus', payload: FocusEvent): void;
  (e: 'blur', payload?: FocusEvent): void;
  (e: 'input', payload: VModelType): void;
  (e: 'change', val?: VModelType): void;
  (e: 'update:modelValue', payload: VModelType): void;
  (e: 'clear'): void;
}
const emit = defineEmits<FieldEmit>();
const props = defineProps(OrionUploadSetupService.props);
const setup = new OrionUploadSetupService(props, emit);
defineExpose(setup.publicInstance);

/** Doc
 * @doc slot/default the label displayed in the drop area
 * @doc/fr slot/default contenu pour remplacer le label par défaut
 *
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
 */
</script>
