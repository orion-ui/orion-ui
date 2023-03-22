import { nextTick, PropType, reactive, Ref, ref } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';

type Props = SetupProps<typeof OrionSectionSetupService.props>
type Emits = {(e: 'update:collapsed', val: boolean): void}

export default class OrionSectionSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/gap define the space with the previous sibling `<o-section>`
		// @doc/fr props/gap définit l'écart avec la `<o-section>` voisine précédente
		gap: {
			type: String as PropType<Orion.Size>,
			default: 'md',
		},
		// @doc props/align alignment of inside elements (convenient for buttons)
		// @doc/fr props/align alignement des éléments à l'intérieur (pratique pour les boutons)
		align: {
			type: String as PropType<'left' | 'center' | 'right' | 'stretch'>,
			default: undefined,
			validator: (value: string): boolean => ['left', 'center', 'right', 'stretch'].includes(value),
		},
		// @doc props/title title of the section
		// @doc/fr props/title titre de la section
		title: {
			type: String as PropType<Nil<string> | Ref<Nil<string>>>,
			default: undefined,
		},
		// @doc props/subtitle subtitle of the section
		// @doc/fr props/subtitle sous-titre de la section
		subtitle: {
			type: String as PropType<Nil<string> | Ref<Nil<string>>>,
			default: undefined,
		},
		// @doc props/collapsible defines if the section can be collapsed
		// @doc/fr props/collapsible définit si la section peut se rétracter
		collapsible: {
			type: Boolean,
			default: false,
		},
		// @doc props/collapsed if the prop `collapsible` is set to `true`, defines this initial state
		// @doc/fr props/collapsed si la prop `collapsible` est à `true`, déinit l'état initial
		collapsed: {
			type: Boolean,
			default: false,
		},
	};

	private state = reactive({ isCollapsed: false });
	private emits: Emits;
	_content = ref<RefDom>();
	_details = ref<HTMLDetailsElement>();

	get isCollapsed () { return this.state.isCollapsed;}

	constructor (props: Props, emits: Emits) {
		super(props);
		this.emits = emits;
	}

	protected onMounted () {
		this.state.isCollapsed = this.props.collapsed;
		this._details.value?.addEventListener('toggle', () => {
			this.state.isCollapsed = !this._details.value?.open;
			this.emits('update:collapsed', !this._details.value?.open);
			nextTick(() => this._content.value?.classList.toggle('orion-section__content--collasped'));
		});
	}
}
