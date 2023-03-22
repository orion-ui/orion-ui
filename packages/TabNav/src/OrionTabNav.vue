<template>
	<jsx-tab-nav/>
</template>

<script setup lang="tsx">
import './OrionTabNav.less';
import { isDefineOrTrue } from 'utils/tools';
import { OrionIcon } from 'packages/Icon';
import OrionTabNavSetupService from './OrionTabNavSetupService';
const props = defineProps(OrionTabNavSetupService.props);
const setup = new OrionTabNavSetupService(props);
defineExpose(setup.publicInstance);

const jsxTabNav = () => {
	const tabs = setup.props.panes.map((pane) => {
		const icon = pane.props.icon || pane.props['font-icon']
			? (<OrionIcon class="orion-tab-nav__icon" icon={ pane.props.icon } fontIcon={pane.props['font-icon']}/>)
			: null;

		const labelContent = pane.children?.label ? pane.children?.label() : pane.props.label;
		const label = labelContent
			? <span class="orion-tab-nav__label">{ labelContent }</span>
			: null;

		let markerColor = pane.props['marker-color'] ?? pane.props['markerColor'];
		let markerClass = `orion-tab-nav__marker orion-tab-nav__marker--${markerColor ?? 'danger'}`;
		if (typeof pane.props.marker === 'number') {
			markerClass += ' orion-tab-nav__marker--number';
		}

		const marker = isDefineOrTrue(pane.props.marker)
			? (
				<span class={ markerClass }>
					{ typeof pane.props.marker === 'number' ? pane.props.marker : null }
				</span>
			) : null;

		return (
			<div
				class={{
					'orion-tab-nav': true,
					'orion-tab-nav--active': setup.props.value === pane.props.name,
					'orion-tab-nav--disabled': isDefineOrTrue(pane.props.disabled),
				}}
				key={`orion-tab-${pane.props.name}`}
				onClick={ (ev: MouseEvent) => setup.props.onTabClick(pane.props, ev) }>
				<div class="orion-tab-nav__content">
					{[ icon, label, marker ]}
				</div>
			</div>
		);
	});

	return (
		<div class="orion-tab-nav-wrap">{ tabs }</div>
	);
};
</script>
