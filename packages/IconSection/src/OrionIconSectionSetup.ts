import { SharedPropsIcon } from '../../Shared/SharedProps';
import SharedSetup from '../../Shared/SharedSetup';

export type OrionIconSectionEmits = {}
export type OrionIconSectionProps = SharedPropsIcon & {
	// @doc props/center centers the content
	// @doc/fr props/center centre le contenu
	center?: boolean,
	// @doc props/title title of the section
	// @doc/fr props/title titre de la section
	title?: string,
};

export default class OrionIconSectionSetup extends SharedSetup {
	static readonly defaultProps = {};

	constructor (protected props: OrionIconSectionProps, protected emits: OrionIconSectionEmits) {
		super();
	}
}
