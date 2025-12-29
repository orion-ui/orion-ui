/**
 * Auto generated file using cli command
 * _> node cli.cjs
 * Then select 'routes' option
 * Manual changes will be overwritten
 */

const packagesRoutes = [
	{
		path: '/packages',
		component: () => import('sandbox/views/LayoutPackages.vue'),
		children: [
			{
				name: 'AlertView',
				path: 'alert',
				component: () => import('sandbox/views/packages/AlertView.vue'),
			},
			{
				name: 'AsideView',
				path: 'aside',
				component: () => import('sandbox/views/packages/AsideView.vue'),
			},
			{
				name: 'AvatarView',
				path: 'avatar',
				component: () => import('sandbox/views/packages/AvatarView.vue'),
			},
			{
				name: 'ButtonView',
				path: 'button',
				component: () => import('sandbox/views/packages/ButtonView.vue'),
			},
			{
				name: 'CardView',
				path: 'card',
				component: () => import('sandbox/views/packages/CardView.vue'),
			},
			{
				name: 'CarouselView',
				path: 'carousel',
				component: () => import('sandbox/views/packages/CarouselView.vue'),
			},
			{
				name: 'ChatView',
				path: 'chat',
				component: () => import('sandbox/views/packages/ChatView.vue'),
			},
			{
				name: 'CheckboxView',
				path: 'checkbox',
				component: () => import('sandbox/views/packages/CheckboxView.vue'),
			},
			{
				name: 'ChipsView',
				path: 'chips',
				component: () => import('sandbox/views/packages/ChipsView.vue'),
			},
			{
				name: 'ColorPickerView',
				path: 'color-picker',
				component: () => import('sandbox/views/packages/ColorPickerView.vue'),
			},
			{
				name: 'CropperView',
				path: 'cropper',
				component: () => import('sandbox/views/packages/CropperView.vue'),
			},
			{
				name: 'DailyCalendarView',
				path: 'daily-calendar',
				component: () => import('sandbox/views/packages/DailyCalendarView.vue'),
			},
			{
				name: 'DateTableView',
				path: 'date-table',
				component: () => import('sandbox/views/packages/DateTableView.vue'),
			},
			{
				name: 'DatepickerView',
				path: 'datepicker',
				component: () => import('sandbox/views/packages/DatepickerView.vue'),
			},
			{
				name: 'EditorView',
				path: 'editor',
				component: () => import('sandbox/views/packages/EditorView.vue'),
			},
			{
				name: 'HorizontalScrollView',
				path: 'horizontal-scroll',
				component: () => import('sandbox/views/packages/HorizontalScrollView.vue'),
			},
			{
				name: 'IconView',
				path: 'icon',
				component: () => import('sandbox/views/packages/IconView.vue'),
			},
			{
				name: 'IconSectionView',
				path: 'icon-section',
				component: () => import('sandbox/views/packages/IconSectionView.vue'),
			},
			{
				name: 'InputView',
				path: 'input',
				component: () => import('sandbox/views/packages/InputView.vue'),
			},
			{
				name: 'InputRangeView',
				path: 'input-range',
				component: () => import('sandbox/views/packages/InputRangeView.vue'),
			},
			{
				name: 'ListView',
				path: 'list',
				component: () => import('sandbox/views/packages/ListView.vue'),
			},
			{
				name: 'LoaderView',
				path: 'loader',
				component: () => import('sandbox/views/packages/LoaderView.vue'),
			},
			{
				name: 'ModalView',
				path: 'modal',
				component: () => import('sandbox/views/packages/ModalView.vue'),
			},
			{
				name: 'NotifView',
				path: 'notif',
				component: () => import('sandbox/views/packages/NotifView.vue'),
			},
			{
				name: 'OtpView',
				path: 'otp',
				component: () => import('sandbox/views/packages/OtpView.vue'),
			},
			{
				name: 'OverlayView',
				path: 'overlay',
				component: () => import('sandbox/views/packages/OverlayView.vue'),
			},
			{
				name: 'PageView',
				path: 'page',
				component: () => import('sandbox/views/packages/PageView.vue'),
			},
			{
				name: 'PasswordView',
				path: 'password',
				component: () => import('sandbox/views/packages/PasswordView.vue'),
			},
			{
				name: 'PhoneView',
				path: 'phone',
				component: () => import('sandbox/views/packages/PhoneView.vue'),
			},
			{
				name: 'PopConfirmView',
				path: 'pop-confirm',
				component: () => import('sandbox/views/packages/PopConfirmView.vue'),
			},
			{
				name: 'ProgressBarView',
				path: 'progress-bar',
				component: () => import('sandbox/views/packages/ProgressBarView.vue'),
			},
			{
				name: 'ProgressCircleView',
				path: 'progress-circle',
				component: () => import('sandbox/views/packages/ProgressCircleView.vue'),
			},
			{
				name: 'RadioView',
				path: 'radio',
				component: () => import('sandbox/views/packages/RadioView.vue'),
			},
			{
				name: 'RateView',
				path: 'rate',
				component: () => import('sandbox/views/packages/RateView.vue'),
			},
			{
				name: 'SectionView',
				path: 'section',
				component: () => import('sandbox/views/packages/SectionView.vue'),
			},
			{
				name: 'SelectView',
				path: 'select',
				component: () => import('sandbox/views/packages/SelectView.vue'),
			},
			{
				name: 'StickerView',
				path: 'sticker',
				component: () => import('sandbox/views/packages/StickerView.vue'),
			},
			{
				name: 'SwipeView',
				path: 'swipe',
				component: () => import('sandbox/views/packages/SwipeView.vue'),
			},
			{
				name: 'TabsView',
				path: 'tabs',
				component: () => import('sandbox/views/packages/TabsView.vue'),
			},
			{
				name: 'TextareaView',
				path: 'textarea',
				component: () => import('sandbox/views/packages/TextareaView.vue'),
			},
			{
				name: 'TimelineView',
				path: 'timeline',
				component: () => import('sandbox/views/packages/TimelineView.vue'),
			},
			{
				name: 'ToggleView',
				path: 'toggle',
				component: () => import('sandbox/views/packages/ToggleView.vue'),
			},
			{
				name: 'TourView',
				path: 'tour',
				component: () => import('sandbox/views/packages/TourView.vue'),
			},
			{
				name: 'UploadView',
				path: 'upload',
				component: () => import('sandbox/views/packages/UploadView.vue'),
			},
		],
	},
];

export default packagesRoutes;
