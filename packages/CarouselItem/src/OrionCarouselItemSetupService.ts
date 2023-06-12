import SharedSetupService from '../../Shared/SharedSetupService';

type Props = SetupProps<typeof OrionCarouselItemSetupService.props>

export default class OrionCarouselItemSetupService extends SharedSetupService<Props> {
	static props = {
		// @doc props/name step identifier
		// @doc/fr props/name identifiant de l'élément
		name: {
			type: [Number, String],
			required: true as const,
		},
	};

	private _carousel?: OrionCarousel;

	get stepsLength () { return this._carousel?.stepsLength; }
	get isActive () { return this._carousel?.step === this.props.name; }

	constructor (props: Props, _carousel?: OrionCarousel) {
		super(props);
		this._carousel = _carousel;
	}
}
