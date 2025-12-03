import { Slots } from 'vue';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionAvatarGroupEmits = {}
export type OrionAvatarGroupProps = {
	max?: number,
	size?: number | Orion.Size,
	color?: Orion.Color,
	label?: string,
	spacing?: number
}

export default class OrionAvatarGroupSetupService extends SharedSetupService {
	static readonly defaultProps = {
		max: 5,
		color: 'primary' as Orion.Color,
		size: 'md' as OrionAvatarGroupProps['size'],
		spacing: 16,
	};

	get avatars () { return this.slots.default?.().filter(x => (x.type as any)?.__name === 'OrionAvatar') ?? []; }
	get visibleAvatars () { return this.avatars.slice(0, this.props.max); }
	get overflowCount () { return Math.max(0, this.avatars.length - this.props.max); }
	get label () { return this.props.label ?? this.overflowCount; }

	constructor (
		protected props: OrionAvatarGroupProps & typeof OrionAvatarGroupSetupService.defaultProps,
		protected emits: OrionAvatarGroupEmits,
		protected slots: Slots,
	) {
		super();
	}
}
