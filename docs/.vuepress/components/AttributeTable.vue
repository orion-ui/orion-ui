<template>
	<div
		v-for="(data, dataType) in packageDataToDisplay"
		:key="dataType"
		class="attribute-table">
		<div v-if="data?.length">
			<h2 v-if="!package" :id="dataType" class="attribute-table__title">
				<a :href="`#${dataType}`" class="header-anchor">
					<span>{{ capitalizeFirstLetter(dataType) }}</span>
				</a>
			</h2>

			<h3 v-else :id="dataType + package" class="attribute-table__title">
				<a :href="`#${dataType + package}`" class="header-anchor">
					<span>{{ capitalizeFirstLetter(dataType) }}</span>
				</a>
			</h3>

			<div class="data-type-table">
				<div class="row data-type-table__row data-type-table__row--header">
					<div :class="dataType === 'props' ? `col-sm-12` : `col-sm-6`">
						<div class="data">Name</div>
					</div>
					<div class="col-sm-6" v-if="dataType !== 'props'">
						<div class="data">
							<template v-if="dataType === 'events'">Payload type</template>
							<template v-if="dataType === 'slots'">Bindings</template>
							<template v-if="dataType === 'publicInstance'">Type</template>
							<template v-if="dataType === 'provide'">Type</template>
						</div>
					</div>
				</div>

				<div v-for="(item, index) in data" :key="index" class="row data-type-table__row">
					<div :class="dataType === 'props' ? `col-sm-12` : `col-sm-6`">
						<div class="data">
							<div class="data__name data__name--typed">
								<span class="data__name-only">{{ item.name }}</span>
								<code v-if="dataType === 'props'">
									<template v-if="itemHas(item, 'type')">
										{{ item.type }}
									</template>
									= <span class="data__value">{{ itemHas(item, 'defaultValue') ? item.defaultValue : 'undefined' }}</span>
								</code>
								<o-label color="danger" outline v-if="itemHas(item, 'required') && item.required">
									Required
								</o-label>
							</div>

							<Markdown
								v-if="itemHas(item, 'desc') && item.desc"
								:source="frontmatter.lang?.includes('fr') ? capitalizeFirstLetter(item.desc.fr !== 'Missing @doc' ?  item.desc.fr  : `${item.desc.en}`) : capitalizeFirstLetter(item.desc.en)"
								class="data__description"/>
						</div>
					</div>
					<div class="col-sm-6" v-if="dataType !== 'props'">
						<div class="data">
							<template v-if="itemHas(item, 'type') || itemHas(item, 'payload') || itemHas(item, 'data')">
								<code :class="`code--${dataType}`">
									<template v-if="itemHas(item, 'type')">{{ item.type }}</template>
									<template v-if="itemHas(item, 'payload')">{{ item.payload.replace('undefined', 'No payload') }}</template>
									<template v-if="itemHas(item, 'data')">{{ item.data }}</template>
								</code>
							</template>
							<template v-if="itemHas(item, 'bindings')">
								<template v-if="item.bindings.length">
									<template v-for="(binded, index) in item.bindings" :key="index">
										<div class="data__slot-binding">
											<div>
												<span class="data__bind">
													{{ binded.bind }}:
												</span>
												<code>
													{{ binded.type }}
												</code>
											</div>
											<Markdown :source="frontmatter.lang?.includes('fr') ? capitalizeFirstLetter(binded.desc.fr !== 'Missing @doc' ?  binded.desc.fr  : `${binded.desc.en}`) : capitalizeFirstLetter(binded.desc.en)" class="data__description"/>
										</div>
									</template>
								</template>
								<template v-else>
									<code>No bindings</code>
								</template>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Bus, itemHas } from '@/lib';
import { capitalizeFirstLetter, usePackageData } from '@utils/tools'
import { usePageFrontmatter } from 'vuepress/client';

const props = defineProps({
	package: {
		type: String,
		default: undefined,
	}
})

const frontmatter = usePageFrontmatter()

const packageData = usePackageData(props.package);
// To define order of appearence
const packageDataToDisplay = {
	props: packageData?.props,
	events: packageData?.events,
	slots: packageData?.slots,
	publicInstance: packageData?.publicInstance,
	provide: packageData?.provide,
}

onMounted(() => {
	Bus.emit('AttributeTable:mounted');
});

onUnmounted(() => {
	Bus.emit('AttributeTable:unMounted');
});
</script>

<style lang="less">
.data-type-table {
	&__row {
		padding: var(--fluid-15px) 0;
		border-bottom: 0.125rem solid var(--grey-lighter);

		&--header {
			background: var(--grey-lighter);
			font-weight: 800;
		}

		.data {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			padding: 0 var(--fluid-15px);

			code {
				align-self: flex-start;

				&.code--publicInstance {
					white-space: pre-wrap;
					tab-size: 2;
				}
			}

			&__name, &__type, &__value, &__bind {
				font-family: var(--font-family-code);
				font-size: 0.75rem;
				line-height: 1.25rem;
				font-weight: 600;
			}

			&__name {
				color: var(--info);
				font-weight: 800;
				font-size: 0.75rem;

				&--typed {
					display: flex;
					align-items: center;
					gap: 0.5rem;
				}
			}

			&__value {
				color: var(--grey-darker);
			}
			
			/* &__bind {
				color: var(--brand);
			} */

			&__description {
				line-height: 1.25rem;
				color: var(--grey-dark);
				
				p {
					line-height: 1.5rem;
					font-size: var(--size-default);

					&::first-letter {
						text-transform: uppercase;
					}

					&:last-child {
						margin-bottom: 0;
					}
				}

				a {
					color: var(--brand);
				}

				strong {
					color: var(--grey-darker);
				} 
			}

			&__slot-binding {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;

				& + .data__slot-binding {
					margin-top: 1rem;
				}
			}
		}
	}
}
</style>
