import { hideAllPoppers } from 'floating-vue';
import { useLang } from 'services/LangService';
import { usePluralize } from 'services/PluralizeService';
import { Log } from 'utils';
import { watch, type ModelRef } from 'vue';
import { SharedSetup } from '../../Shared/SharedSetup';

export type OrionPaginateEmits = {
	// @doc event/paginate/desc emitted on page change or page size change
	// @doc/fr event/paginate/desc émis au changement de page ou de taille de page
	(e: 'paginate', payload: Orion.Paginate.PaginationEvent): void
};

export type OrionPaginateProps = {
	// @doc props/bindRouterPage the key used in the url query to get the current active page (ex: ...url/my-list?**page**=2 • *bindRouterPage = **page***). This is used to bind the pagination state to the url and keep it in sync with the router, avoid using it alongside `page` and `size` props to prevent unexpected behavior
	// @doc/fr props/bindRouterPage représente la clé utilisée dans l'url pour déterminer la page active actuelle (ex: ...url/my-list?**page**=2 • *bindRouterPage = **page***). Cela permet de lier l'état de la pagination à l'url et de le garder synchronisé avec le routeur, évitez de l'utiliser avec les props `page` et `size` pour éviter un comportement inattendu
	bindRouterPage?: string
	// @doc props/bindRouterSize the key used in the url query to get the current page size (ex: ...url/my-list?**size**=20 • *bindRouterSize = **size***). This is used to bind the pagination state to the url and keep it in sync with the router, avoid using it alongside `page` and `size` props to prevent unexpected behavior
	// @doc/fr props/bindRouterSize représente la clé utilisée dans l'url pour déterminer la taille de page actuelle (ex: ...url/my-list?**size**=20 • *bindRouterSize = **size***). Cela permet de lier l'état de la pagination à l'url et de le garder synchronisé avec le routeur, évitez de l'utiliser avec les props `page` et `size` pour éviter un comportement inattendu
	bindRouterSize?: string
	// @doc props/showPageSizeSelect toggles the per-page selector in detailed mode
	// @doc/fr props/showPageSizeSelect affiche ou masque le selecteur de lignes par page en mode detailed
	showPageSizeSelect?: boolean
	// @doc props/showPageInfo toggles the page indicator in detailed mode
	// @doc/fr props/showPageInfo affiche ou masque l'indicateur de page en mode detailed
	showPageInfo?: boolean
	// @doc props/variant pagination style (default or detailed)
	// @doc/fr props/variant style de pagination (default ou detailed)
	variant?: Orion.Paginate.Variant
	// @doc props/sizeOptions page size options displayed in detailed mode
	// @doc/fr props/sizeOptions options de taille de page affichees en mode detailed
	sizeOptions?: number[]
	// @doc props/perPageItemLabel label displayed next to the page size selector in detailed mode
	// @doc/fr props/perPageItemLabel libelle affiche pres du selecteur de taille en mode detailed
	perPageItemLabel?: (size: number) => string
	// @doc props/pageLabel label displayed before the current page value in detailed mode
	// @doc/fr props/pageLabel libelle affiche avant la valeur de page en mode detailed
	pageLabel?: string
	// @doc props/total total number of element which are paginated
	// @doc/fr props/total nombre total d'éléments
	total: number
	// @doc props/maxPageButtons maximum number of page buttons to display in default mode (minimum is 3)
	// @doc/fr props/maxPageButtons nombre maximum de boutons de page à afficher en mode default (le minimum est de 3)
	maxPaginationButtons?: number
};

export class OrionPaginateSetup extends SharedSetup {

	static readonly defaultProps = {
		sizeOptions: () => [10, 20, 50, 100],
		variant: 'default' as Orion.Paginate.Variant,
		showPageSizeSelect: true,
		showPageInfo: true,
		maxPaginationButtons: 5,
		pageLabel: useLang().ORION_PAGINATE__PAGE_LABEL,
		bindRouterSize: 'size',
		perPageItemLabel: (size: number) => {
			return usePluralize(useLang().ORION_PAGINATE__PAGE_ITEM_LABEL, size, false)
			  + ` ${useLang().ORION_PAGINATE__PER_PAGE}`;
		},
	};

	readonly hideAllPoppers = hideAllPoppers;

	private get useRouterBinding () { return !!this.props.bindRouterPage && !!this.props.bindRouterSize }
	get pagesLength () { return Math.ceil(this.props.total / this.size) }
	get flatPages () { return Array.from({ length: this.pagesLength }, (_, i) => i + 1) }
	get pages () {
		const pagesLength = this.pagesLength;
		const maxPageButtons = this.props.maxPaginationButtons!;

		const halfMaxPageButtons = Math.floor(maxPageButtons / 2);
		const minIndexToShow = Math.max(this.index - halfMaxPageButtons, 1) - 1;

		const minIndexPagesToDisplay = Math.min(minIndexToShow, pagesLength - maxPageButtons);
		const maxIndexPagesToDisplay = Math.min(minIndexToShow + maxPageButtons, pagesLength);

		const pagesArray = Array.from({ length: pagesLength }, (_, i) => i + 1);

		let pagesToDisplay: number[] = [...pagesArray];

		if (pagesLength > maxPageButtons) {
			pagesToDisplay = pagesArray.slice(minIndexPagesToDisplay, maxIndexPagesToDisplay);
		}

		const prevPages = pagesArray.filter(x => x <= minIndexPagesToDisplay);
		const nextPages = pagesArray.filter(x => x > maxIndexPagesToDisplay);

		const pages: (number | number[])[] = [...pagesToDisplay];

		if (nextPages.length) {
			nextPages.unshift(pages.pop() as number);
			const pagesToInsert = nextPages.filter(x => x < pagesLength);
			pages.push(
				pagesToInsert.length === 1 ? pagesToInsert[0] : pagesToInsert,
				pagesLength,
			);
		}

		if (prevPages.length) {
			prevPages.push(pages.shift() as number);
			const pagesToInsert = prevPages.filter(x => x > 1);
			pages.unshift(
				1,
				pagesToInsert.length === 1 ? pagesToInsert[0] : pagesToInsert,
			);
		}

		return pages;
	}

	get index () {
		const index = this.vModelPage.value ?? 1;
		if (index < 1) return 1;
		if (index > this.pagesLength) return this.pagesLength;
		return index;
	}

	set index (val) {
		this.emits('paginate', { page: val, size: this.size });
		this.vModelPage.value = val;
		if (this.useRouterBinding) {
			this.router.push({
				...this.router.currentRoute.value,
				query: {
					...this.router.currentRoute.value.query,
					[this.props.bindRouterPage!]: String(val),
					[this.props.bindRouterSize!]: String(this.size),
				},
			});
		}
	}

	get size () { return this.vModelSize.value ?? 20 }
	set size (val) {
		this.emits('paginate', { page: this.index, size: val });
		this.vModelSize.value = val;
		if (this.useRouterBinding) {
			this.router.push({
				...this.router.currentRoute.value,
				query: {
					...this.router.currentRoute.value.query,
					[this.props.bindRouterPage!]: String(this.index),
					[this.props.bindRouterSize!]: String(val),
				},
			});
		}
	}

	constructor (
		protected props: OrionPaginateProps,
		protected emits: OrionPaginateEmits,
		private vModelPage: ModelRef<number | undefined>,
		private vModelSize: ModelRef<number | undefined>,
		private _list?: OrionList,
	) {
		super();

		if (this.useRouterBinding) {
			if ((vModelPage.value !== undefined || vModelSize.value !== undefined) && !this._list) {
				Log.warn(`[OrionPaginate] "page" and/or "size" props are defined alongside "bind-router-page". Avoid using one of both to prevent unexpected behavior.`);
			}

			this.setPageAndSizeFromRouter();

			watch(
				() => this.router.currentRoute.value.query,
				() => this.setPageAndSizeFromRouter(),
			);
		}

	}

	isActive (page?: number) {
		return page === this.index;
	}

	private getParamsFromRouter (param: 'page' | 'size') {
		if (!this.useRouterBinding) return;

		const bindRouterKey = param === 'page' ? this.props.bindRouterPage : this.props.bindRouterSize;
		if (!bindRouterKey) return;

		const paramFromRouter = this.router.currentRoute.value.query[bindRouterKey];
		if (paramFromRouter) {
			const paramNumber = Number(paramFromRouter);
			if (!isNaN(paramNumber)) {
				return paramNumber;
			}
		}
	}

	private setPageAndSizeFromRouter () {
		if (!this.useRouterBinding) return;

		const pageFromRouter = this.getParamsFromRouter('page');
		if (pageFromRouter) {
			this.index = pageFromRouter;

			const sizeFromRouter = this.getParamsFromRouter('size');
			if (sizeFromRouter) {
				this.size = sizeFromRouter;
			}
		}
	}

}
