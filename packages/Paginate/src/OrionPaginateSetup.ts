import { type ModelRef, watch } from 'vue';
import { SharedSetup } from '../../Shared/SharedSetup';

export type OrionPaginateEmits = {
	// @doc event/paginate/desc emitted on page changement
	// @doc/fr event/paginate/desc émis au changement de page
	(e: 'paginate', payload: number): void;
	// @doc event/update-size/desc emitted when the page size changes
	// @doc/fr event/update-size/desc emis quand la taille de page change
	(e: 'update:size', payload: number): void;
}

export type OrionPaginateProps = {
	// @doc props/bindRouter the key used in the url query to get the current active page (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)
	// @doc/fr props/bindRouter représente la clé utilisée dans l'url pour déterminer la page active actuelle (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)
	bindRouter?: string,
	// @doc props/showPerPage toggles the per-page selector in detailed mode
	// @doc/fr props/showPerPage affiche ou masque le selecteur de lignes par page en mode detailed
	showPerPage?: boolean,
	// @doc props/showPageInfo toggles the page indicator in detailed mode
	// @doc/fr props/showPageInfo affiche ou masque l'indicateur de page en mode detailed
	showPageInfo?: boolean,
	// @doc props/variant pagination style (default or detailed)
	// @doc/fr props/variant style de pagination (default ou detailed)
	variant?: 'default' | 'detailed',
	// @doc props/sizeOptions page size options displayed in detailed mode
	// @doc/fr props/sizeOptions options de taille de page affichees en mode detailed
	sizeOptions?: number[],
	// @doc props/perPageLabel label displayed next to the page size selector in detailed mode
	// @doc/fr props/perPageLabel libelle affiche pres du selecteur de taille en mode detailed
	perPageLabel?: string,
	// @doc props/pageLabel label displayed before the current page value in detailed mode
	// @doc/fr props/pageLabel libelle affiche avant la valeur de page en mode detailed
	pageLabel?: string,
	// @doc props/ofLabel label displayed between current page and total pages in detailed mode
	// @doc/fr props/ofLabel libelle affiche entre la page courante et le total en mode detailed
	ofLabel?: string,
	// @doc props/size number of elements to display on each page
	// @doc/fr props/size nombre d'éléments à afficher sur chaque page
	size: number,
	// @doc props/total total number of element which are paginated
	// @doc/fr props/total nombre total d'éléments
	total: number
};

export class OrionPaginateSetup extends SharedSetup {

	static readonly defaultProps = {
		variant: 'default' as const,
		sizeOptions: () => [10, 20, 50, 100],
		perPageLabel: 'Lignes par page',
		pageLabel: 'Page',
		ofLabel: 'sur',
		showPerPage: true,
		showPageInfo: true,
	};

	get pagesLength() { return Math.ceil(this.props.total / this.props.size) }
	private get currentIndex() {
		if (this.props.bindRouter && this.router.currentRoute.value.query[this.props.bindRouter]) {
			return Number(this.router.currentRoute.value.query[this.props.bindRouter]);
		}
		return this.vModel.value;
	}
	private get safeIndex() {
		const pagesLength = this.pagesLength;
		if (!pagesLength || pagesLength < 1) return 1;
		const currentIndex = this.currentIndex;
		if (isNaN(currentIndex) || currentIndex < 1) return 1;
		return currentIndex > pagesLength ? pagesLength : currentIndex;
	}
	get pagesArray() {
		const pagesLength = this.pagesLength;
		if (!pagesLength || pagesLength < 1) return [];
		if (pagesLength <= 5) {
			return Array.from({ length: pagesLength }, (_, index) => index + 1);
		}

		const safeIndex = this.safeIndex;
		let corePages: number[] = [];
		if (safeIndex <= 1) {
			corePages = [1, 2, 3];
		}
		else if (safeIndex >= pagesLength) {
			corePages = [pagesLength - 2, pagesLength - 1, pagesLength];
		}
		else {
			corePages = [safeIndex - 1, safeIndex, safeIndex + 1];
		}

		const pagesSet = new Set<number>([1, pagesLength, ...corePages.filter((page) => page >= 1 && page <= pagesLength)]);
		const pages = Array.from(pagesSet).sort((a, b) => a - b);
		const result: Array<number | string> = [];
		pages.forEach((page, index) => {
			if (index === 0) {
				result.push(page);
				return;
			}
			const previous = pages[index - 1];
			if (page - previous > 1) {
				result.push('...');
			}
			result.push(page);
		});

		return result;
	}

	get pages() {
		const pagesArray = this.pagesArray;
		return pagesArray.map((page, index) => {
			const isEllipsis = page === '...';
			const value = typeof page === 'number' ? page : 0;
			const hiddenPages = isEllipsis ? this.getHiddenPages(pagesArray, index) : [];
			return {
				key: `${page}-${index}`,
				label: page,
				value,
				isEllipsis,
				isActive: typeof page === 'number' ? this.isActive(page) : false,
				hiddenPages,
			};
		}).filter((page) => !page.isEllipsis || page.hiddenPages.length);
	}

	private getHiddenPages(pagesArray: Array<number | string>, index: number) {
		const previousPage = [...pagesArray.slice(0, index)].reverse().find((page) => typeof page === 'number') as number | undefined;
		const nextPage = pagesArray.slice(index + 1).find((page) => typeof page === 'number') as number | undefined;
		if (previousPage === undefined || nextPage === undefined || nextPage - previousPage <= 1) return [];
		const hiddenPages: number[] = [];
		for (let page = previousPage + 1; page < nextPage; page++) {
			hiddenPages.push(page);
		}
		return hiddenPages;
	}

	get index() {
		return this.currentIndex;
	}

	set index(val) {
		if (val < 1 || val > this.pagesLength || isNaN(val) || val === this.index) return;
		this.vModel.value = val;
		this.emits('paginate', val);

		if (this.props.bindRouter && !!this.props.bindRouter.length) {
			this.router.push({
				...this.router.currentRoute.value,
				query: {
					...this.router.currentRoute.value.query,
					[this.props.bindRouter]: val,
				},
			});
		}
	}

	get sizeOptions() {
		const options = this.props.sizeOptions?.length
			? this.props.sizeOptions
			: [10, 20, 50, 100];
		return options.includes(this.props.size)
			? options
			: [...options, this.props.size].sort((a, b) => a - b);
	}

	get sizeModel() {
		return this.props.size;
	}

	set sizeModel(val: Orion.VModel.Select<number>) {
		this.handleSizeUpdate(val);
	}

	handleSizeUpdate(val: Orion.VModel.Select<number>) {
		const sizeValue = Array.isArray(val) ? val[0] : val;
		const parsedValue = Number(sizeValue);
		if (!parsedValue || isNaN(parsedValue)) return;
		this.emits('update:size', parsedValue);
	}


	constructor(protected props: OrionPaginateProps, protected emits: OrionPaginateEmits, protected vModel: ModelRef<number>) {
		super();

		watch([() => this.pagesLength, () => this.index], ([pagesLength]) => {
			if (!pagesLength || pagesLength < 1) return;
			const safeIndex = this.safeIndex;
			if (safeIndex !== this.index) {
				this.index = safeIndex;
			}
		});
	}

	isActive(page?: number) {
		if (this.props.bindRouter && this.router.currentRoute.value.query[this.props.bindRouter]) {
			return Number(this.router.currentRoute.value.query[this.props.bindRouter]) === page;
		}
		return page === this.index;
	}

}
