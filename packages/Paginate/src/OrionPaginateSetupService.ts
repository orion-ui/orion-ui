import SharedSetupService from '../../Shared/SharedSetupService';

type Props = SetupProps<typeof OrionPaginateSetupService.props>
type Emit = {
	(e: 'update:modelValue', payload: number): void;
	(e: 'paginate', payload: number): void;
}

export default class OrionPaginateSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/modelValue active page index
		// @doc/fr props/modelValue index de la page active
		modelValue: {
			type: Number,
			required: true as const,
		},
		// @doc props/size number of elements to display on each page
		// @doc/fr props/size nombre d'éléments à afficher sur chaque page
		size: {
			type: Number,
			required: true as const,
		},
		// @doc props/total total number of element which are paginated
		// @doc/fr props/total nombre total d'éléments
		total: {
			type: Number,
			required: true as const,
		},
		// eslint-disable-next-line max-len
		// @doc props/bindRouter the key used in the url query to get the current active page (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)
		// eslint-disable-next-line max-len
		// @doc/fr props/bindRouter représente la clé utilisée dans l'url pour déterminer la page active actuelle (ex: ...url/my-list?**page**=2 • *bindRouter = **page***)
		bindRouter: {
			type: String,
			default: undefined,
		},
	};

	private emit: Emit;

	get index () {
		if (this.props.bindRouter && this.router.currentRoute.value.query[this.props.bindRouter]) {
			return Number(this.router.currentRoute.value.query[this.props.bindRouter]);
		}
		return this.props.modelValue;
	}

	set index (val) {
		if (val < 1 || val > this.pagesLength || isNaN(val) || val === this.index) return;
		this.emit('update:modelValue', val);
		this.emit('paginate', val);

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


	constructor (props: Props, emit: Emit) {
		super(props);
		this.emit = emit;
	}


	isActive (page?: number) {
		if (this.props.bindRouter && this.router.currentRoute.value.query[this.props.bindRouter]) {
			return Number(this.router.currentRoute.value.query[this.props.bindRouter]) === page;
		}
		return page === this.index;
	}
}
