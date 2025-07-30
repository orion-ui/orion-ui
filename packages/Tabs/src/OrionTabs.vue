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
		onTabClick: setup.onTabClick.bind(setup),
	};

	const header = (
		<div class='orion-tabs__header'>
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


	return (
		<div class="orion-tabs">
			{[ header, content ]}
		</div>
	);
};

/** Doc
 * @doc vModel/vModel component's vModel
 * @doc/fr vModel/vModel vModel du composant
 */
</script>
