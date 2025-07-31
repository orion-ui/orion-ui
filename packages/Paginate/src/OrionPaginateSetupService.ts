import { ModelRef } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import { Reactive } from 'utils/decorators';
import { debounce } from 'lodash-es';

export type OrionPaginateEmits = {
	// @doc event/paginate/desc emitted on page changement
	// @doc/fr event/paginate/desc émis au changement de page
	(e: 'paginate', payload: number): void;
}

export type OrionPaginateProps = {
	// @doc props/bindRouter the key used in the url query to get the current active page (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)
	// @doc/fr props/bindRouter représente la clé utilisée dans l'url pour déterminer la page active actuelle (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)
	bindRouter?: string,
	// @doc props/size number of elements to display on each page
	// @doc/fr props/size nombre d'éléments à afficher sur chaque page
	size: number,
	// @doc props/total total number of element which are paginated
	// @doc/fr props/total nombre total d'éléments
	total: number,
};

export default class OrionPaginateSetupService extends SharedSetupService {

	static readonly defaultProps = {};

	@Reactive protected readonly state = { pageInput: undefined as Undef<number> };

	debouncedUpdate = debounce((val) => {
		this.index = +val;
	}, 500);

	get pageInput () { return this.state.pageInput; }
	set pageInput (val) {
		this.state.pageInput = val;
		if (val) {
			this.debouncedUpdate(val);
		}

	}

	get index () {
		if (this.props.bindRouter && this.router.currentRoute.value.query[this.props.bindRouter]) {
			return Number(this.router.currentRoute.value.query[this.props.bindRouter]);
		}
		return this.vModel.value;
	}

	set index (val) {
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

		this.state.pageInput = undefined;

	}

	get pagesArray () {
		const a = [];
		if (this.vModel.value < 5 || this.pagesLength === 5) {
			for (let index = 1; index <= (this.pagesLength < 6 ? this.pagesLength : 4); index++) {
				a.push(index);
			}
			if (this.pagesLength > 5) {
				a.push('...');
				a.push(this.pagesLength);
			}
		} else if (this.vModel.value > this.pagesLength - 1 && this.vModel.value !== this.pagesLength) {
			a.push(1);
			a.push('...');
			const indexFor = this.pagesLength - 3;
			for (let index = indexFor; index < this.pagesLength -2; index++) {
				a.push(index);
			}
		} else {
			a.push(1);
			a.push('...');
			if (this.vModel.value !== this.pagesLength) {
				const indexFor = this.vModel.value - 2;
				for (let index = indexFor; index <= (this.vModel.value + 2 > this.pagesLength -1 ? this.pagesLength -1 : this.vModel.value + 2); index++) {
					a.push(index);
				}
			} else {
				const indexFor = this.vModel.value - 3;
				for (let index = indexFor; index < this.vModel.value; index++) {
					a.push(index);
				}
			}

			a.push('...');
			a.push(this.pagesLength);
		}
		return a;
	}

	get pagesLength () {
		return Math.ceil(this.props.total / this.props.size);
	}

	constructor (protected props: OrionPaginateProps, protected emits: OrionPaginateEmits, protected vModel: ModelRef<number>) {
		super();
	}


	isActive (page?: number) {
		if (this.props.bindRouter && this.router.currentRoute.value.query[this.props.bindRouter]) {
			return Number(this.router.currentRoute.value.query[this.props.bindRouter]) === page;
		}
		return page === this.index;
	}
}
