import type { SidebarConfig } from '@vuepress/theme-default';
import { readdirSync } from 'fs';
import path from 'path';

export const fr: SidebarConfig = [
	{
		text: 'Guide',
		collapsible: true,
		children: [
			{
				text: 'Orion CLI',
				link: 'https://github.com/orion-ui/orion-cli',
			},
			`/fr/guide/installation.md`,
			`/fr/guide/quick-start.md`,
			`/fr/guide/monkey-patching.md`,
			`/fr/guide/volar.md`,
		],
	},
	{
		text: 'Composants',
		collapsible: true,
		children: [
			{
				text: 'Données',
				children: [
					`/fr/components/OrionAvatar.md`,
					`/fr/components/OrionCard.md`,
					`/fr/components/OrionCarousel.md`,
					`/fr/components/OrionChips.md`,
					`/fr/components/OrionDailyCalendar.md`,
					`/fr/components/OrionDateTable.md`,
					`/fr/components/OrionDragNDrop.md`,
					`/fr/components/OrionIcon.md`,
					`/fr/components/OrionIconSection.md`,
					`/fr/components/OrionLabel.md`,
					`/fr/components/OrionList.md`,
					`/fr/components/OrionProgressBar.md`,
					`/fr/components/OrionProgressCircle.md`,
					`/fr/components/OrionSticker.md`,
					`/fr/components/OrionSwipe.md`,
					`/fr/components/OrionTabs.md`,
					`/fr/components/OrionTimeline.md`,
				],
			},
			{
				text: 'Formulaire',
				children: [
					`/fr/components/OrionButton.md`,
					`/fr/components/OrionCheckbox.md`,
					`/fr/components/OrionColorPicker.md`,
					`/fr/components/OrionCropper.md`,
					`/fr/components/OrionDatePicker.md`,
					`/fr/components/OrionEditor.md`,
					`/fr/components/OrionInput.md`,
					`/fr/components/OrionInputRange.md`,
					`/fr/components/OrionPassword.md`,
					`/fr/components/OrionPhone.md`,
					`/fr/components/OrionRadio.md`,
					`/fr/components/OrionRate.md`,
					`/fr/components/OrionSelect.md`,
					`/fr/components/OrionTextarea.md`,
					`/fr/components/OrionToggle.md`,
					`/fr/components/OrionUpload.md`,
				],
			},
			{
				text: 'Feedback',
				children: [
					`/fr/components/OrionAlert.md`,
					`/fr/components/OrionLoader.md`,
					`/fr/components/OrionNotif.md`,
					`/fr/components/OrionAside.md`,
					`/fr/components/OrionModal.md`,
					`/fr/components/OrionPopConfirm.md`,
				]
			},
			{
				text: 'Mise en page',
				children: [
					`/fr/components/OrionFooterFixed.md`,
					`/fr/components/OrionHorizontalScroll.md`,
					`/fr/components/OrionLayout.md`,
					`/fr/components/OrionOverlay.md`,
					`/fr/components/OrionPage.md`,
					`/fr/components/OrionPaginate.md`,
					`/fr/components/OrionSection.md`,
				],
			},
			{
				text: 'Autres',
				children: [
					`/fr/components/OrionChat.md`,
					// `/fr/components/OrionTour.md`,
				],
			},
		],
	},
	{
		text: 'Services',
		collapsible: true,
		children: readdirSync(path.resolve(__dirname, '../../../fr/services/'))
			.filter(x => x !== 'Tour.md')
			.map(x => '/fr/services/' + x.slice(0, x.length-3))
	},
	{
		text: 'Outils',
		collapsible: true,
		children: [
			'/fr/tooling/bus.md',
			'/fr/tooling/log.md',
			'/fr/tooling/tools.md',
		],
	},
	{
		text: 'Types globaux',
		link:'/fr/globalTypes.md',
	},
	{
		text: 'Contribution',
		collapsible: true,
		children: [
			'/fr/contributing/component.md',
		],
	},
];
