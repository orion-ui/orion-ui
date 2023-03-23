import path from 'path';
import { usePageData } from '@vuepress/client';
import packagesDocData from '@/docs/packages-doc-data';
import servicesDocData from '@/docs/services-doc-data';
import { useLang } from '@/services';

export function rootLib () {
	return path.resolve(__dirname, '../../../');
}

export function capitalizeFirstLetter (text: string) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export function useCurrentPackage() {
	return /Orion(?<name>\w+).html$/.exec(usePageData().value.path)?.[1];
}

export function useCurrentService() {
	return /(?<name>\w+).html$/.exec(usePageData().value.path)?.[1];
}

export function usePackageData(targetPackage?: string) {
	const currentPackage = targetPackage ?? useCurrentPackage();
	if (currentPackage) return packagesDocData.get(currentPackage)
}

export function useServiceData(targetService?: string) {
	const currentService = targetService ?? useCurrentService();
	if (currentService) return servicesDocData.get(currentService)
}

export function addCopyFeatureToCode() {
	document.querySelectorAll('div[class^="language-"]')?.forEach((el) => {

		var copyButton = document.createElement('i');
		copyButton.className = 'orion-icon icon ci-copy orion-icon--ripple orion-icon--ripple-brand orion-icon--clickable oriondoc-demo__copy-icon v-popper--has-tooltip copy-icon';
		el.appendChild(copyButton);
		
		var tooltip = document.createElement('div');
		tooltip.innerText = useLang().COPY ;
		tooltip.className = 'tooltip-prog'
		tooltip.style.display = 'none'

		el.appendChild(tooltip)

		copyButton.addEventListener('mouseover', toggleTooltip.bind(null, tooltip))
		copyButton.addEventListener('mouseleave', () => tooltip.style.display = 'none')
		copyButton.addEventListener('click', copyToClipboard.bind(null, el, tooltip))

	});
}

function toggleTooltip(tooltip: HTMLDivElement) {

	tooltip.style.display = 'block'
	tooltip.innerText = useLang().COPY
}

function copyToClipboard(el: Element, tooltip: HTMLDivElement) {

	tooltip.style.display = 'block'
	tooltip.innerText = `${useLang().COPIED} !`

	const element = el.getElementsByTagName('code').item(0);
	if(element)
		navigator.clipboard.writeText(element.innerText ?? '')

	setTimeout( () => {
		tooltip.style.display = 'none'
		tooltip.innerText = useLang().COPY
	}, 2000) 
}
