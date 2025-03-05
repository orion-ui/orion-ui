import { SharedPropsIcon } from '../../Shared/SharedProps';
import SharedSetupService from '../../Shared/SharedSetupService';

export type OrionIconSectionEmits = {}
export type OrionIconSectionProps = SharedPropsIcon & {
	// @doc props/center centers the content
	// @doc/fr props/center centre le contenu
	center?: boolean,
	// @doc props/title title of the section
	// @doc/fr props/title titre de la section
	title?: string,
};

export default class OrionIconSectionSetupService extends SharedSetupService {
	static readonly defaultProps = {};

	constructor (protected props: OrionIconSectionProps, protected emits: OrionIconSectionEmits) {
		super();
	}
}
