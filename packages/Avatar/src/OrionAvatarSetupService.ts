import SharedSetupService from '../../Shared/SharedSetupService';
import SharedProps from '../../Shared/SharedProps';
import { PropType, reactive, watch } from 'vue';
import { isObject, isString } from 'lodash-es';

type Props = SetupProps<typeof OrionAvatarSetupService.props>

export default class OrionAvatarSetupService extends SharedSetupService<Props> {
	static props = {
		...SharedProps.color('brand'),
		// @doc props/square defines if the avatar is square-shaped (circle otherwise)
		// @doc/fr props/square Définit la forme de l'avatar (ronde par défaut)
		square: Boolean,
		// @doc props/contain adapts the size of the image to fit into the container
		// @doc/fr props/contain adapte la taille de l'image pour s'adapter à son conteneur
		contain: Boolean,
		// @doc props/size the size of the avatar
		// @doc/fr props/size taille de l'avatar
		size: {
			type: [Number, String] as PropType<number | Orion.Size>,
			default: 'md',
		},
		// @doc props/rootUrl the root url when the `avatar` prop is a number or JSON object
		// @doc/fr props/rootUrl url de l'avatar si la prop `avatar` est un nombre ou un objet JSON
		rootUrl: {
			type: String,
			default: '/avatar/',
		},
		// @doc props/name displays first letter of the name if there is no image
		// @doc/fr props/name affiche la première lettre de la prop `name` s'il n'y a pas d'image
		name: {
			type: String,
			default: '',
		},
		// @doc props/avatar the url of the image or an id (combined with root-url prop). More info in [Edges cases](#edge-cases) section.
		// @doc/fr props/avatar url de l'image ou id (combiné avec la prop `root-url`). Plus d'infos dans la section [Cas complexes](#cas-complexes).
		avatar: {
			type: [Object, Number, String] as PropType<{id: number} | number | string>,
			default: undefined,
		},
		// @doc props/updateFunction function to call to update the avatar
		// @doc/fr props/updateFunction fonction à appeler pour modifier l'avatar
		updateFunction: {
			type: Function,
			default: undefined,
		},
		// @doc props/nbAvatarUpdates number to increment on each update to refresh the image
		// @doc/fr props/nbAvatarUpdates nombre à incrémenter à chaque mise à jour de l'image pour la rafraîchir
		nbAvatarUpdates: {
			type: Number,
			default: 0,
		},
		// @doc props/tooltip the tooltip text displayed to update the avatar
		// @doc/fr props/tooltip le texte qui sera affiché dans la tooltip au survol de l'icône de modification
		tooltip: {
			type: String,
			default: undefined,
		},
	};

	private state = reactive({ error: false });

	set error (val: boolean) {
		this.state.error = val;
	}

	get tooltip () {
		return this.props.tooltip ?? this.lang.ORION_AVATAR__TOOLTIP;
	}

	get additionalClass () {
		const additionalClass = [];
		if (isString(this.props.size)) {
			additionalClass.push(`orion-avatar--${this.props.size.toLowerCase()}`);
		}

		if (this.props.square) {
			additionalClass.push('orion-avatar--square');
		}

		if (this.props.contain) {
			additionalClass.push('orion-avatar--contain');
		}

		return additionalClass;
	}

	get internalAvatarId () {
		if (typeof this.props.avatar === 'number' && isFinite(this.props.avatar)) {
			return this.props.avatar;
		} else if (isObject(this.props.avatar) && isFinite(this.props.avatar?.id)) {
			return this.props.avatar.id;
		} else return 0;
	}

	get formatedName () {
		return this.props.name.trim().charAt(0);
	}

	get showInitial () {
		return this.state.error || (typeof this.props.avatar !== 'string'
			&& (!isFinite(this.internalAvatarId) || this.internalAvatarId === 0));
	}

	get updateTrick () {
		return this.props.nbAvatarUpdates ? `?update=${this.props.nbAvatarUpdates}` : '';
	}

	get avatarSrc () {
		if (typeof this.props.avatar === 'string') {
			return this.props.avatar;
		} else {
			return `${this.props.rootUrl}${this.internalAvatarId}${this.updateTrick}`;
		}
	}

	get avatarStyle () {
		if (typeof this.props.size === 'number') {
			return {
				width: `calc(${this.props.size}rem / 16)`,
				height: `calc(${this.props.size}rem / 16)`,
				fontSize: `calc(${this.props.size/2}rem / 16)`,
			};
		} else {
			return {};
		}
	}

	constructor (props: Props) {
		super(props);

		watch(() => this.props.nbAvatarUpdates, (val, oldVal) => {
			this.state.error = val === oldVal;
		});
	}
}
