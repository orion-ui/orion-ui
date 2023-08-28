<template>
	<jsx-timeline/>
</template>

<script setup lang="tsx">
import './OrionTimeline.less';
import { provide, useSlots } from 'vue';
import { OrionLoader } from 'packages/Loader';
import { OrionTimelinePill } from 'packages/TimelinePill';
import OrionTimelineSetupService from './OrionTimelineSetupService';
import { isDefineOrTrue } from 'utils/tools';
type TimelineEmit = {
	(e: 'input', payload: string | number): void
	(e: 'pill-click', ...payload: [OrionTimelinePane, MouseEvent]): void
	(e: 'update:modelValue', payload: string | number): void
}
const emit = defineEmits<TimelineEmit>();
const slots = useSlots();
const props = defineProps(OrionTimelineSetupService.props);
const setup = new OrionTimelineSetupService(props, slots, emit);
provide('_timeline', setup.publicInstance);
defineExpose(setup.publicInstance);

const jsxTimeline = () => {
	const navData = {
		value: setup.props.modelValue,
		panes: setup.panes,
		current: setup.current,
		scrollable: setup.props.scrollable,
		onPillClick: setup.onPillClick.bind(setup),
	};

	const pills = (
		<OrionTimelinePill {...navData}></OrionTimelinePill>
	);

	const loaderData = {
		ref: setup._loader,
		message: typeof setup.props.loader === 'string' ? setup.props.loader : undefined,
		visible: isDefineOrTrue(setup.props.loader),
		size: 'sm' as Orion.Size,
	};

	const content = (
		<div class="orion-timeline__content">
			{ slots.default ? slots.default() : null }
			<OrionLoader { ...loaderData }/>
		</div>
	);


	return (
		<div class={{
			'orion-timeline': true,
			'orion-timeline--horizontal': setup.props.horizontal,
			'orion-timeline--vertical': !setup.props.horizontal,
		}}>
			{[ pills, content ]}
		</div>
	);
};

/** Doc
 * @doc event/input/desc emitted when the value of the timeline changes
 * @doc/fr event/input/desc émis quand la valeur de la timeline change
 *
 * @doc event/pill-click/desc emitted when a pill is clicked
 * @doc/fr event/pill-click/desc émis au moment du click sur une vignette
 *
 * @doc event/update:modelValue/desc emitted to update the model value
 * @doc/fr event/update:modelValue/desc émis pour mettre à jour le modelValue
 */
</script>
