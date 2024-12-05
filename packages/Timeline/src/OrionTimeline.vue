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
import type { OrionTimelineProps, OrionTimelineEmits } from './OrionTimelineSetupService';
const slots = useSlots();
const emits = defineEmits<OrionTimelineEmits>() as OrionTimelineEmits;
const props = withDefaults(defineProps<OrionTimelineProps>(), OrionTimelineSetupService.defaultProps);
const vModel = defineModel<number | string | undefined>();
const setup = new OrionTimelineSetupService(props, emits, slots, vModel);
provide('_timeline', setup.publicInstance);
defineExpose(setup.publicInstance);

const jsxTimeline = () => {
	const navData = {
		value: vModel.value,
		panes: setup.panes,
		
		current: setup.current,
		scrollable: props.scrollable,
		onPillClick: setup.onPillClick.bind(setup),
		centeredPill: props.centeredPill,
	};

	const pills = (
		<><OrionTimelinePill {...navData}></OrionTimelinePill></>
	);

	const loaderData = {
		ref: setup._loader,
		message: typeof props.loader === 'string' ? props.loader : undefined,
		visible: isDefineOrTrue(props.loader),
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
				'orion-timeline--horizontal': props.horizontal,
				'orion-timeline--vertical': !props.horizontal,
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
 */
</script>
