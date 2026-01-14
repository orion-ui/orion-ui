<template>
	<jsx-timeline/>
</template>

<script setup lang="tsx">
import './OrionTimeline.less';
import { provide } from 'vue';
import { OrionLoader } from 'packages/Loader';
import { OrionTimelinePill } from 'packages/TimelinePill';
import OrionTimelineSetupService from './OrionTimelineSetupService';
import { isDefineOrTrue } from 'utils/tools';
import type { OrionTimelineProps, OrionTimelineEmits } from './OrionTimelineSetupService';
const slots = defineSlots();
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
		pillOnly: setup.pillsOnly,
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
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 */
</script>
