import countries from './countries';
import pluralize from 'pluralize';

export default {
	pluralize: pluralize,
	countries: countries,

	ACTIVATE: `Activate`,
	BACK: `Back`,
	CANCEL: `Cancel`,
	CLOSE_ACTION: `Close`,
	CLOSE_MENU: `Close menu`,
	CONFIRM: `Confirm`,
	COPIED: `Copied`,
	COPY: `Copy`,
	COUNTRY: `Country`,
	DATE_FORMAT: `$MM$DATE_SEPARATOR$DD$DATE_SEPARATOR$YYYY`,
	DATE_FROM_TO: `From $start to $end`,
	DATETIME_SEPARATOR: ` - `,
	DATE_SEPARATOR: `-`,
	DAY: `Day`,
	DAY_NAME: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	DEACTIVATE: `Deactivate`,
	ENTER_YOUR_SEARCH_TERM: `Enter your seach term...`,
	ERROR: `Error`,
	FINISH: `Finish`,
	HOUR: `Hour`,
	HOUR_FORMAT: `$hh$TIME_SEPARATOR$mm`,
	HOUR_FROM_TO: `From $start to $end`,
	IN: `In`,
	LOADING: `Loading...`,
	LOADING_CALENDAR: `Loading calendar...`,
	LOADING_RESULTS: `Loading results...`,
	MENU: `Menu`,
	MINUTE: `Minute`,
	MONTH: `Month`,
	MONTH_NAME: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	NEXT: `Next`,
	NO_RESULT: `No result`,
	OR: `or`,
	RESET: `Reset`,
	REDO: `Redo`,
	PREVIOUS: `Previous`,
	SEARCH: `Search`,
	SECOND: `Second`,
	TIME_SEPARATOR: `:`,
	THERE_IS: `Ago`,
	UNDO: `Cancel`,
	VALIDATE: `Validate`,
	WEEK: `Week`,
	YEAR: `Year`,

	get DAY_NAME_SHORT () {
		return this.DAY_NAME.map(x => x.toLowerCase().slice(0, 3));
	},

	get MONTH_NAME_SHORT () {
		return this.MONTH_NAME.map(x => x.toLowerCase().slice(0, 3));
	},

	get DATE_PATTERN () {
		return this.DATE_FORMAT.replaceAll('$DATE_SEPARATOR', this.DATE_SEPARATOR);
	},

	ORION_AVATAR__TOOLTIP: `Update avatar`,
	ORION_CHAT__ENTER_TO_SEND: `Enter to send`,
	ORION_CHAT__LOADING_CONVERSATION: `Loading conversation...`,
	ORION_CHAT__LOADING_MESSAGES: `Loading messages...`,
	ORION_CHAT__NEW_MESSAGE: `New message`,
	ORION_CHAT__START_CONVERSATION: `Start a new conversation`,
	ORION_CHAT__UNREAD_MESSAGE: `Unread message`,
	ORION_CHAT_DISCUSSION__LIST_NEW_CONVERSATION: `New conversation`,
	ORION_CHAT_DISCUSSION__LIST_NO_CONVERSATION: `No conversation`,
	ORION_CHAT_MESSAGE__READ: `Read`,
	ORION_CHAT_MESSAGE__DELIVERED: `Delivered`,
	ORION_EDITOR__ADD_PICTURE: `Add picture`,
	ORION_EDITOR__ADD_PICTURE_LABEL: `Picture link`,
	ORION_EDITOR__ADD_YOUTUBE_LABEL: `Video link`,
	ORION_EDITOR__ALIGN: `Align`,
	ORION_EDITOR__ALIGN_CENTER: `Align center`,
	ORION_EDITOR__ALIGN_LEFT: `Align left`,
	ORION_EDITOR__ALIGN_RIGHT: `Align right`,
	ORION_EDITOR__BACKGROUND_COLOR: `Background color`,
	ORION_EDITOR__BOLD: `Bold`,
	ORION_EDITOR__FONT_SIZE: `Font size`,
	ORION_EDITOR__ITALIC: `Italic`,
	ORION_EDITOR__LINK: `Link`,
	ORION_EDITOR__LINK_URL: `Link url`,
	ORION_EDITOR__PICTURE: `Picture`,
	ORION_EDITOR__PICTURE_URL: `Picture from URL`,
	ORION_EDITOR__PICTURE_TOO_HEAVY: `The picture $fileName is too heavy, max size allowed is $imgMaxSize Ko.`,
	ORION_EDITOR__REGULAR_TEXT: `Regular text`,
	ORION_EDITOR__TEXT_COLOR: `Text color`,
	ORION_EDITOR__TITLE_1: `Title 1`,
	ORION_EDITOR__TITLE_2: `Title 2`,
	ORION_EDITOR__TITLE_3: `Title 3`,
	ORION_EDITOR__UNDERLINE: `Underline`,
	ORION_EDITOR__UNLINK: `Unlink`,
	ORION_EDITOR__UNORDERED_LIST: `Unordered list`,
	ORION_EDITOR__YOUTUBE: `Insert YouTube video`,
	ORION_HORIZONTAL_SCROLL__LEFT: `Slide to the left`,
	ORION_HORIZONTAL_SCROLL__RIGHT: `Slide to the right`,
	ORION_HORIZONTAL_SCROLL__VISIBLE: `Visible elements`,
	ORION_LIST__ITEM_ADJECTIVE: `selected`,
	ORION_LIST__ITEM_TYPE: `item`,
	ORION_PASSWORD__VALIDATION_PASWWORD_CONFIRMATION: `The passwords must match`,
	ORION_PASSWORD__VALIDATION_HAS_LOWERCASE: `At least 1 lowercase`,
	ORION_PASSWORD__VALIDATION_HAS_UPPERCASE: `At least 1 uppercase`,
	ORION_PASSWORD__VALIDATION_HAS_NUMBER: `At least 1 number`,
	ORION_PASSWORD__VALIDATION_LENGTH: `Between 8 and 60 characters`,
	ORION_PHONE__DEFAULT_COUNTRY_CODE: `US` as Orion.Country['code'],
	ORION_POP_CONFIRM__TITLE: `Do you confirm this action ?`,
	ORION_SELECT__REMOVE_VALUE_ERROR: `The value couldn't be removed`,
	ORION_TOUR__ELEMENT_NOT_FOUND_MESSAGE: `Could not go to next step, do you want to retry ?`,
	ORION_UPLOAD__BUTTON: `Select file`,
	ORION_UPLOAD__FILE_TOO_HEAVY: `This file is too heavy, max size allowed : $fileMaxSize Mo`,
	ORION_UPLOAD__INVALID_FILE_TYPE: `This file type is not allowed`,
	ORION_UPLOAD__LABEL: `Drag and drop a file here, $format ($fileMaxSize Mo max)`,
	ORION_UPLOAD__PROCESSING: `Processing...`,

	USE_CONFIRM__TITLE: `Confirmation`,
};
