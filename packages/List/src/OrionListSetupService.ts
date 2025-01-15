import { isNil } from 'lodash-es';
import SharedSetupService from '../../Shared/SharedSetupService';
import usePluralize from 'services/PluralizeService';
import { getAppLang } from 'services/LangService';
import { ModelRef } from 'vue';

export type OrionListEmits = {
	(e: 'clear-selection'): void;
	(e: 'paginate', payload: number): void;
}


export type OrionListProps<T = any> = {
	// @doc props/bindRouter the key used in the url query to bind the current page to the pagination component (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)
	// @doc/fr props/bindRouter représente la clé utilisée dans l'url pour binder la page courante au composant de pagination (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)
	bindRouter?: string,
	// @doc props/cellClass class applied to the list's cells when the layout is `grid`
	// @doc/fr props/cellClass classe appliquée aux cellules de la liste quand la disposition est sous forme de `grid`
	cellClass?: string,
	// @doc props/gridClass class applied to the list when the layout is `grid`
	// @doc/fr props/gridClass classe appliquée à la liste quand la disposition est sous forme de `grid`
	gridClass?: string,
	// @doc props/itemAdjective the adjective used for the item selection (to customize the selection footer)
	// @doc/fr props/itemAdjective l'adjectif utilisé pour les élements sélectionnés (pour personnaliser le footer de sélection)
	itemAdjective?: string,
	// @doc props/itemType item type of the list (to customize the selection footer)
	// @doc/fr props/itemType type d'élément de la liste (pour personnaliser le footer de sélection)
	itemType?: string,
	// @doc props/layout layout of the list
	// @doc/fr props/layout disposition de la liste
	layout?: Orion.ListLayout,
	// @doc props/list items of the list
	// @doc/fr props/list élements de la liste
	list: T[],
	// @doc props/total total number of items in the list
	// @doc/fr props/total nombre total d'éléments dans la liste
	total: number,
	// @doc props/trackKey determine the `key` used for the v-for in the list loop
	// @doc/fr props/trackKey détermine la `key` utilisée pour le v-for dans la boucle de la liste
	trackKey?: string,
	// @doc props/useAutoPagination use OrionList's pagination system. Useful if you pass the full list in props
	// @doc/fr props/useAutoPagination utilise le système de pagination d'OrionList. Utile si vous pasez la liste compl!te en props
	useAutoPagination?: boolean,
	// @doc props/useFooterSelected displays a footer when any items of the list are selected (useful for batch action on selected items)
	// @doc/fr props/useFooterSelected affiche un pied de page quand des éléments de la liste sont sélectionnés (utile en cas d'action groupée sur les éléments sélectionnés)
	useFooterSelected?: boolean,
	// @doc props/usePaginationBottom displays pagination at the bottom of the list
	// @doc/fr props/usePaginationBottom affiche une pagination en bas de la liste
	usePaginationBottom?: boolean,
	// @doc props/usePaginationTop displays pagination at the top of the list
	// @doc/fr props/usePaginationTop affiche une pagination en haut de la liste
	usePaginationTop?: boolean,
};

export default class OrionListSetupService<T extends Record<string,any>> extends SharedSetupService {
	static readonly defaultProps = {
		cellClass: 'col-sm-6 col-lg-4 col-xl-3',
		gridClass: 'row row--grid',
		layout: 'grid' as Orion.ListLayout,
		list: () => [],
		total: 0,
		trackKey: 'id',
		useAutoPagination: false,
		useFooterSelected: true,
		usePaginationBottom: true,
		usePaginationTop: true,
	};

	get computedLayout () { return this.responsive.onPhone ? 'grid' : this.props.layout; }
	get itemType () { return this.props.itemType ?? this.lang.ORION_LIST__ITEM_TYPE; }
	get itemAdjective () { return this.props.itemAdjective ?? this.lang.ORION_LIST__ITEM_ADJECTIVE; }
	get computedItemType () { return usePluralize(this.itemType, this.selected.value.length, false); }

	get computedItemAdjective () {
		return getAppLang() === 'fr'
			? usePluralize(this.itemAdjective, this.selected.value.length, false)
			: this.itemAdjective;
	}

	get listToDisplay () : T[] {
		return this.props.useAutoPagination
			? this.props.list.slice(
				this.page.value.size * (this.page.value.index - 1),
				this.page.value.size * this.page.value.index,
			)
			: this.props.list;
	}

	// @doc vModel/page configuration of the list's pagination (size: number of items per page, index: current page)
	// @doc/fr vModel/page configuration de la pagination de la liste (size: nombre d'éléments par page, index: page actuelle)
	// @doc vModel/selected array of the selected items
	// @doc/fr vModel/selected tableau contenant les élements sélectionnés
	constructor (
		protected props: OrionListProps<T> & Omit<typeof OrionListSetupService.defaultProps, 'list'> & {list: T[]},
		protected emits: OrionListEmits,
		protected page: ModelRef<Orion.ListPage>,
		protected selected: ModelRef<T[]>) {
		super();

	}

	async onBeforeMount () {
		if (isNil(this.page.value)) {
			this.page.value = {
				size: 20,
				index: 1,
			};
		}
	}


	clearSelection () {
		this.selected.value.length = 0;
		this.emits('clear-selection');
	}

	handleOnPaginate () {
		this.emits('paginate', this.page.value.index);
	}

	listItemIsSelected (item: T): boolean {
		return this.selected.value
			.map(x => x[this.props.trackKey!])
			.includes(item[this.props.trackKey!]);
	}
}
