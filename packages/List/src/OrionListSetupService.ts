import { PropType } from 'vue';
import { isNil } from 'lodash-es';
import SharedSetupService from '../../Shared/SharedSetupService';
import usePluralize from 'services/PluralizeService';
import { getAppLang } from 'services/LangService';

type Props = SetupProps<typeof OrionListSetupService.props>
type Emit = {
	(e: 'update:page', payload: Orion.ListPage): void;
	(e: 'update:selected', payload: any[]): void;
	(e: 'clear-selection'): void;
	(e: 'paginate', payload: number): void;
}

export default class OrionListSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/useAutoPagination use OrionList's pagination system. Useful if you pass the full list in props
		// @doc/fr props/useAutoPagination utilise le système de pagination d'OrionList. Utile si vous pasez la liste compl!te en props
		useAutoPagination: Boolean,
		// @doc props/usePaginationTop displays pagination at the top of the list
		// @doc/fr props/usePaginationTop affiche une pagination en haut de la liste
		usePaginationTop: {
			type: Boolean,
			default: true,
		},
		// @doc props/usePaginationBottom displays pagination at the bottom of the list
		// @doc/fr props/usePaginationBottom affiche une pagination en bas de la liste
		usePaginationBottom: {
			type: Boolean,
			default: true,
		},
		// @doc props/useFooterSelected displays a footer when any items of the list are selected (useful for batch action on selected items)
		// eslint-disable-next-line max-len
		// @doc/fr props/useFooterSelected affiche un pied de page quand des éléments de la liste sont sélectionnés (utile en cas d'action groupée sur les éléments sélectionnés)
		useFooterSelected: {
			type: Boolean,
			default: true,
		},
		// @doc props/list items of the list
		// @doc/fr props/list élements de la liste
		list: {
			type: Array as PropType<any[]>,
			default: (): any[] => [],
		},
		// @doc props/selected array of the selected items
		// @doc/fr props/selected tableau contenant les élements sélectionnés
		selected: {
			type: Array as PropType<any[]>,
			default: (): any[] => [],
		},
		// @doc props/total total number of items in the list
		// @doc/fr props/total nombre total d'éléments dans la liste
		total: {
			type: Number,
			default: 0,
		},
		// @doc props/page configuration of the list's pagination (size: number of items per page, index: current page)
		// @doc/fr props/page configuration de la pagination de la liste (size: nombre d'éléments par page, index: page actuelle)
		page: {
			type: Object as PropType<Orion.ListPage>,
			default: (): Orion.ListPage => ({
				size: 20,
				index: 1,
			}),
		},
		// @doc props/trackKey determine the `key` used for the v-for in the list loop
		// @doc/fr props/trackKey détermine la `key` utilisée pour le v-for dans la boucle de la liste
		trackKey: {
			type: String,
			default: 'id',
		},
		// @doc props/layout layout of the list
		// @doc/fr props/layout disposition de la liste
		layout: {
			type: String as PropType<'grid' | 'row'>,
			default: 'grid',
			validator: (value: string): boolean => ['grid', 'row'].includes(value),
		},
		// @doc props/gridClass class applied to the list when the layout is `grid`
		// @doc/fr props/gridClass classe appliquée à la liste quand la disposition est sous forme de `grid`
		gridClass: {
			type: String,
			default: 'row row--grid',
		},
		// @doc props/cellClass class applied to the list's cells when the layout is `grid`
		// @doc/fr props/cellClass classe appliquée aux cellules de la liste quand la disposition est sous forme de `grid`
		cellClass: {
			type: String,
			default: 'col-sm-6 col-lg-4 col-xl-3',
		},
		// @doc props/itemType item type of the list (to customize the selection footer)
		// @doc/fr props/itemType type d'élément de la liste (pour personnaliser le footer de sélection)
		// @doc props/itemType/default depends on the selected language
		itemType: {
			type: String,
			default: undefined,
		},
		// @doc props/itemAdjective the adjective used for the item selection (to customize the selection footer)
		// @doc/fr props/itemAdjective l'adjectif utilisé pour les élements sélectionnés (pour personnaliser le footer de sélection)
		// @doc props/itemAdjective/default depends on the selected language
		itemAdjective: {
			type: String,
			default: undefined,
		},
		// eslint-disable-next-line max-len
		// @doc props/bindRouter the key used in the url query to bind the current page to the pagination component (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)
		// eslint-disable-next-line max-len
		// @doc/fr props/bindRouter représente la clé utilisée dans l'url pour binder la page courante au composant de pagination (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)
		bindRouter: {
			type: String,
			default: undefined,
		},
	};

	private emit: Emit;

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
	set page (val) { this.emit('update:page', val); }

	get selected () { return this.props.selected; }
	set selected (val) { this.emit('update:selected', val); }


	constructor (props: Props, emit: Emit) {
		super(props);
		this.emit = emit;
	}

	async onBeforeMount () {
		if (isNil(this.page)) {
			this.emit('update:page', {
				size: 20,
				index: 1,
			});
		}
	}


	clearSelection () {
		this.selected.length = 0;
		this.emit('clear-selection');
	}

	handleOnPaginate () {
		this.emit('update:page', this.page);
		this.emit('paginate', this.page.index);
	}

	listItemIsSelected (item: any) {
		return this.selected
			.map(x => x[this.props.trackKey])
			.includes(item[this.props.trackKey]);
	}
}
