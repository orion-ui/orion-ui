import SharedSetupService from '../../Shared/SharedSetupService';
import { reactive, watch } from 'vue';
import { isObject, isString } from 'lodash-es';
import SharedProps, { SharedPropsColor } from '../../Shared/SharedProps';

export type OrionAvatarEmits = {}
export type OrionAvatarProps = SharedPropsColor & {
	// @doc props/avatar the url of the image or an id (combined with root-url prop). More info in [Edges cases](#edge-cases) section.
	// @doc/fr props/avatar url de l'image ou id (combiné avec la prop `root-url`). Plus d'infos dans la section [Cas complexes](#cas-complexes).
	avatar?: {id: number} | number | string,
	// @doc props/contain adapts the size of the image to fit into the container
	// @doc/fr props/contain adapte la taille de l'image pour s'adapter à son conteneur
	contain?: boolean,
	// @doc props/name displays first letter of the name if there is no image
	// @doc/fr props/name affiche la première lettre de la prop `name` s'il n'y a pas d'image
	name?: string,
	// @doc props/nbAvatarUpdates number to increment on each update to refresh the image
	// @doc/fr props/nbAvatarUpdates nombre à incrémenter à chaque mise à jour de l'image pour la rafraîchir
	nbAvatarUpdates?: number,
	// @doc props/rootUrl the root url when the `avatar` prop is a number or JSON object
	// @doc/fr props/rootUrl url de l'avatar si la prop `avatar` est un nombre ou un objet JSON
	rootUrl?: string,
	// @doc props/size the size of the avatar
	// @doc/fr props/size taille de l'avatar
	size?: number | Orion.Size,
	// @doc props/square defines if the avatar is square-shaped (circle otherwise)
	// @doc/fr props/square Définit la forme de l'avatar (ronde par défaut)
	square?: boolean,
	// @doc props/tooltip the tooltip text displayed to update the avatar
	// @doc/fr props/tooltip le texte qui sera affiché dans la tooltip au survol de l'icône de modification
	tooltip?: string,
	// @doc props/updateFunction function to call to update the avatar
	// @doc/fr props/updateFunction fonction à appeler pour modifier l'avatar
	updateFunction?: () => void,
};

export default class OrionAvatarSetupService extends SharedSetupService {
	static readonly defaultProps = {
		size: SharedProps.size['size'] as OrionAvatarProps['size'],
		contain: false,
		name: '',
		nbAvatarUpdates: 0,
		rootUrl: '/avatar/',
		color: 'brand' as Orion.Color,
		square: false,
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

	constructor (
		protected props: OrionAvatarProps & typeof OrionAvatarSetupService.defaultProps,
		protected emits: OrionAvatarEmits
	) {
		super();

		watch(() => this.props.nbAvatarUpdates, (val, oldVal) => {
			this.state.error = val === oldVal;
		});
	}
}
