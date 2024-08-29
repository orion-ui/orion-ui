import { isNil } from 'lodash-es';
import SharedSetupService from '../../Shared/SharedSetupService';
import usePluralize from 'services/PluralizeService';
import { getAppLang } from 'services/LangService';

export type OrionListEmits = {
	(e: 'update:page', payload: Orion.ListPage): void;
	(e: 'update:selected', payload: any[]): void;
	(e: 'clear-selection'): void;
	(e: 'paginate', payload: number): void;
}

export type OrionListProps = {
	// @doc props/bindRouter the key used in the url query to bind the current page to the pagination component (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)
	// @doc/fr props/bindRouter représente la clé utilisée dans l'url pour binder la page courante au composant de pagination (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)
	bindRouter?: string,
	// @doc props/cellClass class applied to the list's cells when the layout is `grid`
	// @doc/fr props/cellClass classe appliquée aux cellules de la liste quand la disposition est sous forme de `grid`
	cellClass: string,
	// @doc props/gridClass class applied to the list when the layout is `grid`
	// @doc/fr props/gridClass classe appliquée à la liste quand la disposition est sous forme de `grid`
	gridClass: string,
	// @doc props/itemAdjective the adjective used for the item selection (to customize the selection footer)
	// @doc/fr props/itemAdjective l'adjectif utilisé pour les élements sélectionnés (pour personnaliser le footer de sélection)
	itemAdjective?: string,
	// @doc props/itemType item type of the list (to customize the selection footer)
	// @doc/fr props/itemType type d'élément de la liste (pour personnaliser le footer de sélection)
	itemType?: string,
	// @doc props/layout layout of the list
	// @doc/fr props/layout disposition de la liste
	layout: Orion.ListLayout,
	// @doc props/list items of the list
	// @doc/fr props/list élements de la liste
	list: any[],
	// @doc props/page configuration of the list's pagination (size: number of items per page, index: current page)
	// @doc/fr props/page configuration de la pagination de la liste (size: nombre d'éléments par page, index: page actuelle)
	page: Orion.ListPage,
	// @doc props/selected array of the selected items
	// @doc/fr props/selected tableau contenant les élements sélectionnés
	selected: any[],
	// @doc props/total total number of items in the list
	// @doc/fr props/total nombre total d'éléments dans la liste
	total: number,
	// @doc props/trackKey determine the `key` used for the v-for in the list loop
	// @doc/fr props/trackKey détermine la `key` utilisée pour le v-for dans la boucle de la liste
	trackKey: string,
	// @doc props/useAutoPagination use OrionList's pagination system. Useful if you pass the full list in props
	// @doc/fr props/useAutoPagination utilise le système de pagination d'OrionList. Utile si vous pasez la liste compl!te en props
	useAutoPagination: boolean,
	// @doc props/useFooterSelected displays a footer when any items of the list are selected (useful for batch action on selected items)
	// @doc/fr props/useFooterSelected affiche un pied de page quand des éléments de la liste sont sélectionnés (utile en cas d'action groupée sur les éléments sélectionnés)
	useFooterSelected: boolean,
	// @doc props/usePaginationBottom displays pagination at the bottom of the list
	// @doc/fr props/usePaginationBottom affiche une pagination en bas de la liste
	usePaginationBottom: boolean,
	// @doc props/usePaginationTop displays pagination at the top of the list
	// @doc/fr props/usePaginationTop affiche une pagination en haut de la liste
	usePaginationTop: boolean,
};

export default class OrionListSetupService extends SharedSetupService {
	static readonly defaultProps = {
		cellClass: 'col-sm-6 col-lg-4 col-xl-3',
		gridClass: 'row row--grid',
		layout: 'grid' as Orion.ListLayout,
		list: (): any[] => [],
		page: (): Orion.ListPage => ({
			size: 20,
			index: 1,
		}),
		selected: (): any[] => [],
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
	get computedItemType () { return usePluralize(this.itemType, this.selected.length, false); }

	get computedItemAdjective () {
		return getAppLang() === 'fr'
			? usePluralize(this.itemAdjective, this.selected.length, false)
			: this.itemAdjective;
	}

	get listToDisplay () {
		return this.props.useAutoPagination
			? this.props.list.slice(
				this.page.size * (this.page.index - 1),
				this.page.size * this.page.index,
			)
			: this.props.list;
	}

	get page () { return this.props.page; }
	set page (val) { this.emits('update:page', val); }

	get selected () { return this.props.selected; }
	set selected (val) { this.emits('update:selected', val); }


	constructor (protected props: OrionListProps, protected emits: OrionListEmits) {
		super();

	}

	async onBeforeMount () {
		if (isNil(this.page)) {
			this.emits('update:page', {
				size: 20,
				index: 1,
			});
		}
	}


	clearSelection () {
		this.selected.length = 0;
		this.emits('clear-selection');
	}

	handleOnPaginate () {
		this.emits('update:page', this.page);
		this.emits('paginate', this.page.index);
	}

	listItemIsSelected (item: any) {
		return this.selected
			.map(x => x[this.props.trackKey])
			.includes(item[this.props.trackKey]);
	}
}
