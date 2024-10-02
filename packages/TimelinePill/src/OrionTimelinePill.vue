
<template>
	<jsx-timeline-pill/>
</template>
<script setup lang="tsx">
import './OrionTimelinePill.less';
 import { OrionIcon } from 'packages/Icon';
 import { OrionHorizontalScroll } from 'packages/HorizontalScroll';
import OrionTimelinePillSetupService from './OrionTimelinePillSetupService';
import { isDefineOrTrue } from 'utils/tools';
import type { OrionTimelinePillProps, OrionTimelinePillEmits } from './OrionTimelinePillSetupService';
const emits = defineEmits<OrionTimelinePillEmits>() as OrionTimelinePillEmits;
const props = withDefaults(defineProps<OrionTimelinePillProps>(), OrionTimelinePillSetupService.defaultProps);
const setup = new OrionTimelinePillSetupService(props, emits);
defineExpose(setup.publicInstance);

const jsxTimelinePill = () => {
	const panes = props.panes;

	const useBefore = !!panes.filter(p => !!p.children?.before).length;

	const timeline = panes.map((pane, index): any => {
		const originIndex = panes.findIndex(pane => pane.props.name === props.value);

		const isCenteredPill = props.centeredPill || isDefineOrTrue(pane.props['centered-pill']);
		const icon = pane.props.icon || pane.props['font-icon']
			? (<OrionIcon class="orion-timeline-pill__icon" icon={pane.props.icon} fontIcon={pane.props['font-icon']}/>)
			: null;

		let markerColor = pane.props['marker-color'] ?? pane.props['markerColor'];
		let markerClass = `orion-timeline-pill__marker orion-timeline-pill__marker--${markerColor ?? 'danger'}`;
		if (typeof pane.props.marker === 'number') {
			markerClass += ' orion-timeline-pill__marker--number';
		}

		const marker = isDefineOrTrue(pane.props.marker)
			? (
				<span class={markerClass}>
					{ typeof pane.props.marker === 'number' ? pane.props.marker : null }
				</span>
			) : null;

		const before = pane.children?.before
			? (<div class="orion-timeline-pill__before">{ pane.children.before() }</div>)
			: useBefore ? <div class="orion-timeline-pill__before"/> : null;

		const after = pane.children?.after
			? (<div class="orion-timeline-pill__after">{ pane.children.after() }</div>)
			: null;

		const clickable = props.value !== null
				&& (props.current === pane.props.name || isDefineOrTrue(pane.props.complete) || index <= originIndex);

		return (
			<div class={{
				'orion-timeline-pill-wrapper': true,
				'orion-timeline-pill-wrapper--centered-pill': isCenteredPill,
			}}>
				{ before }
				<div class="orion-timeline-pill">
					<div
						class={{
							'orion-timeline-pill__core': true,
							'orion-timeline-pill__core--filled': index < originIndex || isDefineOrTrue(pane.props.complete),
							'orion-timeline-pill__core--active': props.current === pane.props.name,
							'orion-timeline-pill__core--disabled': isDefineOrTrue(pane.props.disabled),
							'orion-timeline-pill__core--clickable': clickable,
							'orion-timeline-pill__core--text': !!pane.props.pill,
						}}
						key={`orion-timeline-${pane.props.name}`}
						onClick={ (ev: MouseEvent) => clickable ? props.onPillClick(pane.props, ev) : null }>
						{ icon ?? <span class="orion-timeline-pill__core-text">{pane.props.pill}</span> }
						{ marker }
					</div>
					{ isCenteredPill && <div class="orion-timeline-pill__separator orion-timeline-pill__separator--before"/> }
					<div class="orion-timeline-pill__separator orion-timeline-pill__separator--after"/>
				</div>
				{ after }
			</div>
		);
	});
	
	const scrollStep = () => { return [...document.querySelectorAll('.orion-timeline-pill-wrapper')] as HTMLElement[];};
	
	return (
		!props.scrollable
			? <div class="orion-timeline__pills">{ timeline }</div>
			: <><OrionHorizontalScroll scrollStep={scrollStep}>
				<div class="orion-timeline__pills">{timeline}</div>
			</OrionHorizontalScroll></>
	);
};
</script>