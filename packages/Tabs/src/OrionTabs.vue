<template>
	<jsx-tabs/>
</template>

<script setup lang="tsx">
import './OrionTabs.less';
import { provide, useSlots } from 'vue';
import { isDefineOrTrue } from 'utils/tools';
import { OrionTabNav } from 'packages/TabNav';
import { OrionLoader } from 'packages/Loader';
import OrionTabsSetupService from './OrionTabsSetupService';
type TabsEmit = {
	(e: 'input', payload: string): void
	(e: 'tab-click', ...payload: [OrionTabPane, MouseEvent]): void
	(e: 'update:modelValue', payload: string): void
}
const emit = defineEmits<TabsEmit>();
const slots = useSlots();
const props = defineProps(OrionTabsSetupService.props);
const setup = new OrionTabsSetupService(props, slots, emit);
provide('_tabs', setup.publicInstance);
defineExpose(setup.publicInstance);

const jsxTabs = () => {
	const navData = {
		value: setup.props.modelValue,
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
		message: typeof setup.props.loader === 'string' ? setup.props.loader : undefined,
		visible: isDefineOrTrue(setup.props.loader),
		size: 'sm' as Orion.Size,
	};

	const content = (
		<div class="orion-tabs__content">
			{
				setup.props.useRouter
					? <router-view name={setup.props.routerViewName}/>
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
 * @doc event/input/desc emitted when the value of the input changes
 * @doc/fr event/input/desc émis quand on change d'onglet
 *
 * @doc event/tab-click/desc emitted on tab click
 * @doc/fr event/tab-click/desc émis au moment du click sur un tab
 *
 * @doc event/update:modelValue/desc emitted to update the model value
 * @doc/fr event/update:modelValue/desc émis pour mettre à jour la valeur du modelValue
 */
</script>
