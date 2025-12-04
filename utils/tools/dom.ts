import { Dropdown } from 'floating-vue';
import { useDocument } from 'services/DocumentService';
import { Ref, nextTick } from 'vue';

/**
 * @desc hightlights an element of the DOM
 * @param {(HTMLElement | string | null | undefined)} element DOM element to highlight
 * @param {{ padding?: number, delay?: number, event?: MouseEvent }} [options] options
 * @return void
 */
export function highlightDomElement (element: Nil<HTMLElement | string>, options?: { padding?: number, delay?: number, event?: MouseEvent }) {
	const browserDocument = useDocument();
	if (!browserDocument) return;

	if (typeof element === 'string') {
		element = browserDocument.getElementById(element);
	}

	if (!element) return;

	const mergedOptions = {
		...{
			padding: 3,
			delay: 1000,
			event: undefined,
		},
		...(options ?? {}),
	};

	const highlighter = browserDocument.createElement('canvas');
	highlighter.classList.add('orion-highlighter');
	highlighter.style.top = (element.offsetTop - mergedOptions.padding) + 'px';
	highlighter.style.left = (element.offsetLeft - mergedOptions.padding) + 'px';
	highlighter.style.height = (element.offsetHeight + mergedOptions.padding * 2) + 'px';
	highlighter.style.width = (element.offsetWidth + mergedOptions.padding * 2) + 'px';

	if (element.parentElement && element.parentElement.append) {
		// https://developer.mozilla.org/fr/docs/Web/API/ParentNode/append
		element.parentElement.append(highlighter);
	}

	setTimeout(() => {
		highlighter.classList.add('orion-highlighter--visible');
	}, 50);

	if (mergedOptions.event?.type === 'mouseenter') {
		mergedOptions.event.target?.addEventListener('mouseleave', () => {
			highlighter.addEventListener('transitionend', () => highlighter.remove());
			highlighter.classList.remove('orion-highlighter--visible');
		}, { once: true });
	} else if (mergedOptions.event?.type === 'click' || !mergedOptions.event) {
		setTimeout(() => {
			highlighter.addEventListener('transitionend', () => highlighter.remove());
			highlighter.classList.remove('orion-highlighter--visible');
		}, mergedOptions.delay);
	}
}

/**
 * @desc add a 'click' event listener on the popover's backdrop to close it
 * @param {Ref<InstanceType<typeof Dropdown>>} popoverRef
 * @param {() => void} [cb]
 * @return void
 */
export function addPopoverBackdropCloseAbility (popoverRef: Ref<Undef<InstanceType<typeof Dropdown>>>, cb?: () => void) {
	const targetPopoverId = (popoverRef.value?.getTargetNodes() as HTMLElement[])[0]?.getAttribute('aria-describedby');
	if (targetPopoverId) {
		const backdrop = document.getElementById(targetPopoverId)?.querySelector('.v-popper__backdrop') as Undef<HTMLElement>;
		backdrop?.addEventListener('click', () => {
			popoverRef.value?.hide();
			nextTick(() => cb?.());
		}, { once: true });
	}
}
