<template>
    <div v-if="currentService === 'Monkey'">
      <div v-for="(serviceDataItem, prototypeName) in serviceData('Monkey')">
        <h3 :id="prototypeName">
					<a :href="`#${prototypeName}`" class="header-anchor">
						<span>{{prototypeName}}</span>
					</a>
				</h3>
				<div>
					<jsx-list-item v-for="(item, key) in serviceDataItem" :item="item" :keyname="key"/>
				</div>
      </div>
    </div>

		<div v-else-if="tools">
			<jsx-list-item v-for="(item, key) in toolsDocData" :item="item" :keyname="key"/>
    </div>
		
    <div v-else-if="Object.keys(serviceData(currentService)).length">
      <h2 id="Methods">
				<a :href="`#Methods`" class="header-anchor">
					<span>Methods</span>
				</a>
			</h2>
			<jsx-list-item v-for="(item, key) in serviceData(currentService)" :key="key" :item="item" :keyname="key"/>
    </div>
</template>

<script setup lang="tsx">
import Markdown from 'vue3-markdown-it';
import { onMounted, onUnmounted } from 'vue';
import { Bus } from '@/lib';
import { capitalizeFirstLetter, useCurrentService, useServiceData } from '@utils/tools';
import toolsDocData from '@/docs/tools-doc-data';

type ServiceData<T> = Record<string, T>;
type ServiceDataPrototype = Record<string, ServiceDataItem>;
type ServiceDataItem = {
    description: string;
    return: string;
    param: {
      name: string,
      type: string,
      description: string,
      defaultValue?: string
    }[]
		deprecated?: string
}

const props = defineProps({
	service: {
		type: String,
		default: undefined,
	},
	tools: {
		type: Boolean,
		default: false,
	}
})

const currentService = props.tools ? 'tools' : useCurrentService();

const jsxListItem = (props : {item : ServiceDataItem, keyname: string}) => {
	const methodName = `${props.keyname}(${props.item?.param?.filter(x => x.type.trim().length).map(x => x.name).join(', ')})`

  return (
		<prop-description name={methodName} type={props.item?.return} deprecated={props.item?.deprecated}>
			{ 
				props.item?.description 
					? <Markdown source={capitalizeFirstLetter(props.item?.description)}/>
					: undefined
			}

			<div class="function-parameters">
				{
					props.item?.param?.map(({ name, type, description, defaultValue }) => {
						return (
							<div class="function-parameters__details">
								<span class="function-parameters__name"> {name} </span>
								<code>
									{type}
									{ defaultValue ? <span> = {defaultValue}</span> : undefined }
								</code>
								<div class="function__description">
									<Markdown source={capitalizeFirstLetter(description)
										.replace(/\\n/gm, '\\\n')
										.replace(/\\$/gm, '')
									}/>
								</div>
							</div>
						)
					})
				}
			</div>
		</prop-description>
  );
}; 

function serviceData <T extends 'Monkey'> (service: T): ServiceData<ServiceDataPrototype>
function serviceData <T extends string> (service?: T): ServiceData<ServiceDataItem>
function serviceData <T extends 'Monkey' | string> (service: T): ServiceData<ServiceDataPrototype> | ServiceData<ServiceDataItem>
function serviceData <T extends 'Monkey' | string> (service: T) {
  if (service === 'Monkey') {
    return useServiceData(service) as ServiceData<ServiceDataPrototype>;
  }
  return useServiceData(service) as ServiceData<ServiceDataItem>;
}

onMounted(() => {
	Bus.emit('ServicePreview:mounted');
});

onUnmounted(() => {
	Bus.emit('ServicePreview:unMounted');
});
</script>

<style scoped lang="less">
/* :deep(.prop-description:first-child) {
	border-top: none;
} */

:deep(.function-parameters) {
	margin: 1rem auto 0.25rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	&:empty {
		display: none;
	}

	&__name {
		font-family: var(--font-family-code);
		font-size: 0.75rem;
		line-height: 1.25rem;
		color: var(--grey-darker);
		font-weight: 600;
	}

	&__details {
		margin-left: 1rem;
		border-left: 0.1875rem solid var(--grey-light);
		padding: 0 0 0.1875rem var(--fluid-10px);
	}

	.function__description {
		code, pre {
			margin: 0;
		}
	}
}
</style>
