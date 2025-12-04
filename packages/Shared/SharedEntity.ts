import { reactive } from 'vue';

export class SharedEntity<T extends {}> {
	protected entity = reactive({}) as T;

	constructor (data?: Partial<T>) {
		if (data) this.assignData(data);
	}

	assignData (data: Partial<T>) {
		Object.assign(this.entity, data);
	}

	resetData () {
		this.entity = reactive({}) as T;
	}
}
