import { ModelRef, nextTick, Ref, ref } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionSectionEmits = {}
export type OrionSectionProps = {
	// @doc props/align alignment of inside elements (convenient for buttons)
	// @doc/fr props/align alignement des éléments à l'intérieur (pratique pour les boutons)
	align?: 'left' | 'center' | 'right' | 'stretch',
	// @doc props/collapsible defines if the section can be collapsed
	// @doc/fr props/collapsible définit si la section peut se rétracter
	collapsible?: boolean,
	// @doc props/gap define the space with the previous sibling `<o-section>`
	// @doc/fr props/gap définit l'écart avec la `<o-section>` voisine précédente
	gap?: Orion.Size,
	// @doc props/subtitle subtitle of the section
	// @doc/fr props/subtitle sous-titre de la section
	subtitle?: Nil<string>,
	// @doc props/title title of the section
	// @doc/fr props/title titre de la section
	title?: Nil<string>,
};

export default class OrionSectionSetupService extends SharedSetupService {
	static readonly defaultProps = {
		collapsible: false,
		gap: 'md' as Orion.Size,
	};

	readonly _content = ref<RefDom>();
	readonly _el = ref<HTMLDetailsElement>();

	// @doc vModel/collapsed if the prop `collapsible` is set to `true`, defines this initial state
	// @doc/fr vModel/collapsed si la prop `collapsible` est à `true`, déinit l'état initial
	constructor (
		protected props: OrionSectionProps & typeof OrionSectionSetupService.defaultProps,
		protected emits: OrionSectionEmits, protected collapsed: ModelRef<boolean>) {
		super();
	}

	protected onMounted () {
		this._el.value?.addEventListener('toggle', () => {
			this.collapsed.value = !this._el.value?.open;
			nextTick(() => this._content.value?.classList.toggle('orion-section__content--collasped'));
		});
	}
}
