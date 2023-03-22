import { getUid } from 'utils/tools';

export abstract class PopableService<T> {
	protected options: Partial<Orion.Popable.Options> & {
    openauto: boolean;
    programmatic: boolean;
    uid: number;
  };


	constructor (options: Partial<Orion.Aside.Options>) {
		this.options = {
			openauto: true,
			...options,
			programmatic: true,
			uid: getUid(),
		};
	}


  abstract createVNode (): T
}
