import type { SidebarConfig } from '@vuepress/theme-default';
import { readdirSync } from 'fs';
import path from 'path';

export const en: SidebarConfig = [
	{
		text: 'Guide',
		collapsible: true,
		children: [
			{
				text: 'Orion CLI',
				link: 'https://github.com/orion-ui/orion-cli',
			},
			`/guide/installation.md`,
			`/guide/quick-start.md`,
			`/guide/monkey-patching.md`,
			`/guide/volar.md`,
		],
	},
	{
		text: 'Components',
		collapsible: true,
		children: [
			{
				text: 'Datas',
				children: [
					`/components/OrionAvatar.md`,
					`/components/OrionCard.md`,
					`/components/OrionCarousel.md`,
					`/components/OrionChips.md`,
					`/components/OrionDailyCalendar.md`,
					`/components/OrionDateTable.md`,
					`/components/OrionDragNDrop.md`,
					`/components/OrionIcon.md`,
					`/components/OrionIconSection.md`,
					`/components/OrionLabel.md`,
					`/components/OrionList.md`,
					`/components/OrionProgressBar.md`,
					`/components/OrionProgressCircle.md`,
					`/components/OrionSticker.md`,
					`/components/OrionSwipe.md`,
					`/components/OrionTabs.md`,
					`/components/OrionTimeline.md`,
				],
			},
			{
				text: 'Form',
				children: [
					`/components/OrionButton.md`,
					`/components/OrionCheckbox.md`,
					`/components/OrionColorPicker.md`,
					`/components/OrionCropper.md`,
					`/components/OrionDatePicker.md`,
					`/components/OrionEditor.md`,
					`/components/OrionInput.md`,
					`/components/OrionInputRange.md`,
					`/components/OrionOtp.md`,
					`/components/OrionPassword.md`,
					`/components/OrionPhone.md`,
					`/components/OrionRadio.md`,
					`/components/OrionRate.md`,
					`/components/OrionSelect.md`,
					`/components/OrionTextarea.md`,
					`/components/OrionToggle.md`,
					`/components/OrionUpload.md`,
				],
			},
			{
				text: 'Feedback',
				children: [
					`/components/OrionAlert.md`,
					`/components/OrionLoader.md`,
					`/components/OrionNotif.md`,
					`/components/OrionAside.md`,
					`/components/OrionModal.md`,
					`/components/OrionPopConfirm.md`,
				]
			},
			{
				text: 'Layout',
				children: [
					`/components/OrionFooterFixed.md`,
					`/components/OrionHorizontalScroll.md`,
					`/components/OrionLayout.md`,
					`/components/OrionOverlay.md`,
					`/components/OrionPage.md`,
					`/components/OrionPaginate.md`,
					`/components/OrionSection.md`,
				],
			},
			{
				text: 'Others',
				children: [
					`/components/OrionChat.md`,
					// `/components/OrionTour.md`,
				],
			},
		],
	},
	{
		text: 'Services',
		collapsible: true,
		children: readdirSync(path.resolve(__dirname, '../../../services/'))
			.filter(x => x !== 'Tour.md')
			.map(x => '/services/' + x.slice(0, x.length-3))
	},
	{
		text: 'Tooling',
		collapsible: true,
		children: [
			'/tooling/bus.md',
			'/tooling/log.md',
			'/tooling/tools.md',
		],
	},
	'/globalTypes.md',
	{
		text: 'Contributing',
		collapsible: true,
		children: [
			'/contributing/component.md',
		],
	},
];
