import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionPaginateEmits = {
	(e: 'update:modelValue', payload: number): void;
	(e: 'paginate', payload: number): void;
}

export type OrionPaginateProps = {
	// @doc props/bindRouter the key used in the url query to get the current active page (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)
	// @doc/fr props/bindRouter représente la clé utilisée dans l'url pour déterminer la page active actuelle (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)
	bindRouter?: string,
	// @doc props/modelValue active page index
	// @doc/fr props/modelValue index de la page active
	modelValue: number,
	// @doc props/size number of elements to display on each page
	// @doc/fr props/size nombre d'éléments à afficher sur chaque page
	size: number,
	// @doc props/total total number of element which are paginated
	// @doc/fr props/total nombre total d'éléments
	total: number,
};

export default class OrionPaginateSetupService extends SharedSetupService {
	static readonly defaultProps = {};

	get index () {
		if (this.props.bindRouter && this.router.currentRoute.value.query[this.props.bindRouter]) {
			return Number(this.router.currentRoute.value.query[this.props.bindRouter]);
		}
		return this.props.modelValue;
	}

	set index (val) {
		if (val < 1 || val > this.pagesLength || isNaN(val) || val === this.index) return;
		this.emits('update:modelValue', val);
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

	get pagesArray () {
		const a = [];
		if (this.props.modelValue < 5 || this.pagesLength === 5) {
			for (let index = 1; index <= (this.pagesLength < 6 ? this.pagesLength : 4); index++) {
				a.push(index);
			}
			if (this.pagesLength > 5) {
				a.push('...');
				a.push(this.pagesLength);
			}
		} else if (this.props.modelValue > this.pagesLength - 4) {
			a.push(1);
			a.push('...');
			const indexFor = this.pagesLength - 3;
			for (let index = indexFor; index <= this.pagesLength; index++) {
				a.push(index);
			}
		} else {
			a.push(1);
			a.push('...');
			const indexFor = this.props.modelValue - 2;
			for (let index = indexFor; index <= this.props.modelValue + 2; index++) {
				a.push(index);
			}
			a.push('...');
			a.push(this.pagesLength);
		}

		return a;
	}

	protected get pagesLength () {
		return Math.ceil(this.props.total / this.props.size);
	}


	constructor (protected props: OrionPaginateProps, protected emits: OrionPaginateEmits) {
		super();
	}


	isActive (page?: number) {
		if (this.props.bindRouter && this.router.currentRoute.value.query[this.props.bindRouter]) {
			return Number(this.router.currentRoute.value.query[this.props.bindRouter]) === page;
		}
		return page === this.index;
	}
}
