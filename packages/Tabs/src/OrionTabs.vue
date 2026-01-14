<template>
	<jsx-tabs/>
</template>

<script setup lang="tsx">
import './OrionTabs.less';
import { provide } from 'vue';
import { isDefineOrTrue } from 'utils/tools';
import { OrionTabNav } from 'packages/TabNav';
import { OrionLoader } from 'packages/Loader';
import OrionTabsSetupService from './OrionTabsSetupService';
import type { OrionTabsProps, OrionTabsEmits } from './OrionTabsSetupService';
const slots = defineSlots();
const emits = defineEmits<OrionTabsEmits>() as OrionTabsEmits;
const props = withDefaults(defineProps<OrionTabsProps>(), OrionTabsSetupService.defaultProps);
const vModel = defineModel<string | undefined>();
const setup = new OrionTabsSetupService(props, emits, slots, vModel);
provide('_tabs', setup.publicInstance);
defineExpose(setup.publicInstance);



const jsxTabs = () => {
	const navData = {
		value: vModel.value,
		panes: setup.panes,
		floatingTabs: props.floatingTabs,
		onTabClick: setup.onTabClick.bind(setup),
	};

	let headerClass = `orion-tabs__header`;
	if (props.floatingTabs) {
		headerClass += ' orion-tabs__header--floating';
	}
	const header = (
		<div class={headerClass}>
			<OrionTabNav {...navData}></OrionTabNav>
		</div>
	);

	const loaderData = {
		ref: setup._loader,
		message: typeof props.loader === 'string' ? props.loader : undefined,
		visible: isDefineOrTrue(props.loader),
		size: 'sm' as Orion.Size,
	};

	const content = (
		<div class="orion-tabs__content">
			{
				props.useRouter
					? <router-view name={props.routerViewName}/>
					: slots.default ? slots.default() : null
			}
			<OrionLoader { ...loaderData }/>
		</div>
	);

	let tabsClass = `orion-tabs`;
	if (props.floatingTabs) {
		tabsClass += ' orion-tabs--floating';
	}

	return (
		<div class={tabsClass}>
			{[ header, content ]}
		</div>
	);
};

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 */
</script>
