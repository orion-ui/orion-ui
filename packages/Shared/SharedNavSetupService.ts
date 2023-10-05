import { RouteLocationRaw } from 'vue-router';
import SharedSetupService from './SharedSetupService';

type ItemTemplateData = {
	to?: RouteLocationRaw;
	class: string[];
}

export default abstract class SharedNavSetupService<P> extends SharedSetupService<P> {
	abstract baseClass: string;
	abstract get items (): Orion.NavItem[];


	get itemsToDisplay () {
		return this.items?.filter(x => typeof x.if === 'function' ? x.if() : x.if !== false);
	}


	constructor (props?: P) {
		super(props);
	}


	itemIs (item: Orion.NavItem) {
		if (item.line) {
			return 'hr';
		} else {
			if (item.to) {
				return 'router-link';
			} else {
				return item.tag ? item.tag : 'span';
			}
		}
	}

	itemData (item: Orion.NavItem) {
		if (item.line) {
			return { class: [] };
		} else {
			const itemData: ItemTemplateData = { class: [this.baseClass] };

			if (!item.line) {
				itemData.class = [`${this.baseClass}__item`];
				if (item.to) {
					itemData.to = item.to;
				}
			}

			if (item.root) {
				itemData.class.push(`${this.baseClass}__item--root`);
			}

			if (item.always) {
				itemData.class.push(`${this.baseClass}__item--always`);
			}

			if (item.reload) {
				itemData.class.push('nav-reload');
			}

			if (item.class) {
				itemData.class.push(item.class);
			}

			if (item.sectionTitle) {
				itemData.class.push(`${this.baseClass}__item--section-title`);
			}

			if (item.activeWhenExact) {
				itemData.class.push('active-when-exact');
			}

			return itemData;
		}
	}

	handleClick (item: Orion.NavItem, ev: MouseEvent | TouchEvent) {
		if (ev.metaKey || ev.ctrlKey) return;
		if (item.callback) item.callback(item, ev);
		if (item.to) this.router.push(item.to);
	}

	checkIfReloadIsNeeded (e: MouseEvent) {
		const target = e.target as HTMLElement;

		if (target.classList?.contains('nav-reload')
      && target.classList?.contains('router-link-exact-active')
      && !e.ctrlKey
      && !e.metaKey
		) {
			this.window?.location.reload();
		}
	}
}
