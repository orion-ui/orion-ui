import { nextTick, reactive, Ref, ref } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionSectionEmits = {(e: 'update:collapsed', val: boolean): void}
export type OrionSectionProps = {
	// @doc props/align alignment of inside elements (convenient for buttons)
	// @doc/fr props/align alignement des éléments à l'intérieur (pratique pour les boutons)
	align?: 'left' | 'center' | 'right' | 'stretch',
	// @doc props/collapsed if the prop `collapsible` is set to `true`, defines this initial state
	// @doc/fr props/collapsed si la prop `collapsible` est à `true`, déinit l'état initial
	collapsed: boolean,
	// @doc props/collapsible defines if the section can be collapsed
	// @doc/fr props/collapsible définit si la section peut se rétracter
	collapsible: boolean,
	// @doc props/gap define the space with the previous sibling `<o-section>`
	// @doc/fr props/gap définit l'écart avec la `<o-section>` voisine précédente
	gap: Orion.Size,
	// @doc props/subtitle subtitle of the section
	// @doc/fr props/subtitle sous-titre de la section
	subtitle?: Nil<string> | Ref<Nil<string>>,
	// @doc props/title title of the section
	// @doc/fr props/title titre de la section
	title?: Nil<string> | Ref<Nil<string>>,
};

export default class OrionSectionSetupService extends SharedSetupService {
	static readonly defaultProps = {
		collapsed: false,
		collapsible: false,
		gap: 'md' as Orion.Size,
	};

	private state = reactive({ isCollapsed: false });

	readonly _content = ref<RefDom>();
	readonly _el = ref<HTMLDetailsElement>();

	get isCollapsed () { return this.state.isCollapsed;}

	constructor (protected props: OrionSectionProps, protected emits: OrionSectionEmits) {
		super();
	}

	protected onMounted () {
		this.state.isCollapsed = this.props.collapsed;
		this._el.value?.addEventListener('toggle', () => {
			this.state.isCollapsed = !this._el.value?.open;
			this.emits('update:collapsed', !this._el.value?.open);
			nextTick(() => this._content.value?.classList.toggle('orion-section__content--collasped'));
		});
	}
}
