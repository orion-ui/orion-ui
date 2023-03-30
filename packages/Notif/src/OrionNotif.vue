<template>
	<div
		v-show="setup.visible"
		:id="`OrionNotif-${setup.uid}`"
		:ref="setup._el"
		class="orion-notif"
		:class="[setup.options.customClass, `orion-notif--${setup.options.color}`]">
		<orion-icon
			class="orion-notif__icon"
			v-bind="{
				icon: setup.options.icon,
				fontIcon: setup.options.fontIcon,
			}"/>

		<div class="orion-notif__content">
			<h5
				v-if="setup.options.title"
				class="orion-notif__title">
				{{ setup.options.title }}
			</h5>

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

		<orion-loader :ref="setup._loader"/>
	</div>
</template>

<script setup lang="ts">
import './OrionNotif.less';
import { provide } from 'vue';
import { OrionIcon } from 'packages/Icon';
import { OrionLoader } from 'packages/Loader';
import OrionNotifSetupService from './OrionNotifSetupService';
type NotifEmit = {
	(e: 'enter-start'): void,
	(e: 'enter-end'): void,
	(e: 'leave-start'): void,
	(e: 'leave-end'): void,
}
const emit = defineEmits<NotifEmit>();
const props = defineProps(OrionNotifSetupService.props);
const setup = new OrionNotifSetupService(props, emit);
provide('_notif', setup.publicInstance);
defineExpose(setup.publicInstance);

/** Doc
 * @doc event/enter-start/desc the notification begins its enter transition
 * @doc event/enter-end/desc the notification ends its enter transition
 * @doc event/leave-start/desc the notification begins its leave transition
 * @doc event/leave-end/desc the notification ends its leave transition
 */
</script>
