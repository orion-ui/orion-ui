<template>
	<div
		v-show="setup.visible"
		:id="`OrionNotif-${setup.uid}`"
		:ref="setup._el"
		class="orion-notif"
		:class="[setup.options.customClass, `orion-notif--${setup.options.color}`]">
		<orion-icon
			v-if="options.icon || options.fontIcon"
			class="orion-notif__icon"
			v-bind="{
				icon: setup.options.icon,
				fontIcon: setup.options.fontIcon,
			}"/>
		<div class="orion-notif__content">
			<div class="orion-notif__header">
				<h5
					v-if="setup.options.title"
					class="orion-notif__title">
					{{ setup.options.title }}
				</h5>

				<template v-if="setup.showTimer()">
					<span
						class="orion-notif__timer"
						@click="setup.close({ keepInQueue: false } )"
						@touchend.prevent.stop="setup.close({ keepInQueue: false } )">
						<span class="orion-notif__timer-circle"/>
						{{ setup.timer }}
					</span>
					<span
						:ref="setup._timerProgress"
						class="orion-notif__timer-progress orion-notif__timer-progress--animated"
						:style="{ animationDuration: options.duration + 's' }"/>
				</template>
				<template v-else-if="!setup.options.hideClose">
					<span
						class="orion-notif__close"
						@click="setup.close({ keepInQueue: false } )"
						@touchend.prevent.stop="setup.close({ keepInQueue: false } )"/>
				</template>
			</div>
			<component
				:is="setup.options.Nested"
				v-if="setup.options.Nested && setup.isMounted"
				class="orion-modal__nested"
				v-bind="setup.options.NestedProps"/>

			<div
				v-if="setup.options.message"
				class="orion-notif__message"
				v-html="setup.options.message"/>
		</div>

		<orion-loader :ref="setup._loader"/>
	</div>
</template>

<script setup lang="ts">
import './OrionNotif.less';
import { provide } from 'vue';
import { OrionIcon } from 'packages/Icon';
import { OrionLoader } from 'packages/Loader';
import OrionNotifSetupService from './OrionNotifSetupService';
import type { OrionNotifProps, OrionNotifEmits } from './OrionNotifSetupService';
const emits = defineEmits<OrionNotifEmits>() as OrionNotifEmits;
const props = withDefaults(defineProps<OrionNotifProps>(), OrionNotifSetupService.defaultProps);
const setup = new OrionNotifSetupService(props, emits);
provide('_notif', setup.publicInstance);
defineExpose(setup.publicInstance);

</script>
