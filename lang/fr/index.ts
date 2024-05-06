import countries from './countries';
import Pluralizer from './Pluralizer';

export default {
	pluralize: Pluralizer.pluralize,
	countries: countries,

	ACTIVATE: `Activer`,
	BACK: `Retour`,
	CANCEL: `Annuler`,
	CHARACTER: `caractère`,
	CLOSE_ACTION: `Fermer`,
	CLOSE_MENU: `Fermer le menu`,
	CONFIRM: `Confirmer`,
	COPIED: `Copié`,
	COPY: `Copier`,
	COUNTRY: `Pays`,
	DATE_FORMAT: `$DD$DATE_SEPARATOR$MM$DATE_SEPARATOR$YYYY`,
	DATE_FROM_TO: `Du $start au $end`,
	DATETIME_SEPARATOR: ` - `,
	DATE_SEPARATOR: `/`,
	DAY: `Jour`,
	DAY_NAME: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
	DEACTIVATE: `Désactiver`,
	ENTER_YOUR_SEARCH_TERM: `Entrez votre recherche...`,
	ERROR: `Erreur`,
	FINISH: `Terminer`,
	HOUR: `Heure`,
	HOUR_FORMAT: `$hh$TIME_SEPARATOR$mm`,
	HOUR_FROM_TO: `De $start à $end`,
	IN: `Dans`,
	LOADING: `Chargement...`,
	LOADING_CALENDAR: `Chargement du calendrier...`,
	LOADING_RESULTS: `Chargement des résultats...`,
	MENU: `Menu`,
	MINUTE: `Minute`,
	MONTH: `Mois`,
	MONTH_NAME: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
	NEXT: `Suivant`,
	NO_RESULT: `Aucun résultat`,
	OR: `ou`,
	RESET: `Réinitiliser`,
	REDO: `Rétablir`,
	PREVIOUS: `Précédent`,
	SEARCH: `Rechercher`,
	SECOND: `Seconde`,
	TIME_SEPARATOR: `:`,
	THERE_IS: `Il y a`,
	UNDO: `Annuler`,
	VALIDATE: `Valider`,
	WEEK: `Semaine`,
	YEAR: `An`,
	WEEK_NUMBER_LABEL: 'Sem.',

	get DAY_NAME_SHORT () {
		return this.DAY_NAME.map(x => x.toLowerCase().slice(0, 3));
	},

	get MONTH_NAME_SHORT () {
		return this.MONTH_NAME.map(x => x.toLowerCase().slice(0, 3));
	},

	get DATE_PATTERN () {
		return this.DATE_FORMAT.replaceAll('$DATE_SEPARATOR', this.DATE_SEPARATOR);
	},

	ORION_AVATAR__TOOLTIP: `Modifier mon avatar`,
	ORION_CHAT__ENTER_TO_SEND: `Entrée pour envoyer`,
	ORION_CHAT__LOADING_CONVERSATION: `Chargement de la conversation...`,
	ORION_CHAT__LOADING_MESSAGES: `Chargement des messages...`,
	ORION_CHAT__NEW_MESSAGE: `Nouveau message`,
	ORION_CHAT__START_CONVERSATION: `Débutez une nouvelle conversation`,
	ORION_CHAT__UNREAD_MESSAGE: `Message non-lu`,
	ORION_CHAT_DISCUSSION__LIST_NEW_CONVERSATION: `Nouvelle discussion`,
	ORION_CHAT_DISCUSSION__LIST_NO_CONVERSATION: `Aucune discussion`,
	ORION_CHAT_MESSAGE__READ: `Lu`,
	ORION_CHAT_MESSAGE__DELIVERED: `Distribué`,
	ORION_EDITOR__ADD_PICTURE: `Ajout d'une image`,
	ORION_EDITOR__ADD_PICTURE_LABEL: `Lien de l'image`,
	ORION_EDITOR__ADD_YOUTUBE_LABEL: `Lien de la vidéo`,
	ORION_EDITOR__ALIGN: `Alignement`,
	ORION_EDITOR__ALIGN_CENTER: `Aligner au centre`,
	ORION_EDITOR__ALIGN_LEFT: `Aligner à gauche`,
	ORION_EDITOR__ALIGN_RIGHT: `Aligner à droite`,
	ORION_EDITOR__BACKGROUND_COLOR: `Couleur de fond`,
	ORION_EDITOR__BOLD: `Gras`,
	ORION_EDITOR__FONT_SIZE: `Taille de police`,
	ORION_EDITOR__ITALIC: `Italique`,
	ORION_EDITOR__LINK: `Lien`,
	ORION_EDITOR__LINK_URL: `Adresse du lien`,
	ORION_EDITOR__PICTURE: `Image`,
	ORION_EDITOR__PICTURE_URL: `Image depuis URL`,
	ORION_EDITOR__PICTURE_TOO_HEAVY: `L'image $fileName est trop lourde, la taille maximale autorisée est de $imgMaxSize Ko.`,
	ORION_EDITOR__REGULAR_TEXT: `Texte normal`,
	ORION_EDITOR__TEXT_COLOR: `Couleur de texte`,
	ORION_EDITOR__TITLE_1: `Titre 1`,
	ORION_EDITOR__TITLE_2: `Titre 2`,
	ORION_EDITOR__TITLE_3: `Titre 3`,
	ORION_EDITOR__UNDERLINE: `Souligné`,
	ORION_EDITOR__UNLINK: `Supprimer le lien`,
	ORION_EDITOR__UNORDERED_LIST: `Liste à puces`,
	ORION_EDITOR__YOUTUBE: `Insérer une vidéo YouTube`,
	ORION_HORIZONTAL_SCROLL__LEFT: `Glisser vers la gauche`,
	ORION_HORIZONTAL_SCROLL__RIGHT: `Glisser vers la droite`,
	ORION_HORIZONTAL_SCROLL__VISIBLE: `Éléments visibles`,
	ORION_LIST__ITEM_ADJECTIVE: `sélectionné`,
	ORION_LIST__ITEM_TYPE: `élément`,
	ORION_PASSWORD__VALIDATION_PASWWORD_CONFIRMATION: `Les mots de passe doivent correspondre`,
	ORION_PASSWORD__VALIDATION_HAS_LOWERCASE: `Au moins 1 minuscule`,
	ORION_PASSWORD__VALIDATION_HAS_UPPERCASE: `Au moins 1 majuscule`,
	ORION_PASSWORD__VALIDATION_HAS_NUMBER: `Au moins 1 chiffre`,
	ORION_PASSWORD__VALIDATION_LENGTH: `Entre 8 et 60 caractères`,
	ORION_PHONE__DEFAULT_COUNTRY_CODE: `FR` as Orion.Country['code'],
	ORION_POP_CONFIRM__TITLE: `Confirmez-vous cette action ?`,
	ORION_SELECT__REMOVE_VALUE_ERROR: `La valeur n'a pu être supprimée`,
	ORION_TOUR__ELEMENT_NOT_FOUND_MESSAGE: `Impossible de passer à l'étape suivante, souhaitez-vous réessayer ?`,
	ORION_UPLOAD__BUTTON: `Sélectionnez un fichier`,
	ORION_UPLOAD__FILE_TOO_HEAVY: `Ce fichier est trop lourd, taille maximale autorisée : $fileMaxSize Mo`,
	ORION_UPLOAD__INVALID_FILE_TYPE: `Ce type de fichier n'est pas autorisé`,
	ORION_UPLOAD__LABEL: `Glissez et déposez un fichier ici au format $format ($fileMaxSize Mo max)`,
	ORION_UPLOAD__PROCESSING: `Traîtement en cours...`,

	USE_CONFIRM__TITLE: `Confirmation`,

	VALIDATOR_ERROR_REQUIRED: `Requis`,
	VALIDATOR_ERROR_HAS_LOWERCASE: `Caractère minuscule manquant`,
	VALIDATOR_ERROR_HAS_UPPERCASE: `Caractère majuscule manquant`,
	VALIDATOR_ERROR_HAS_NUMBER: `Caractère numérique manquant`,
	VALIDATOR_ERROR_HAS_SPECIAL_CHAR: `Caractère spécial manquant`,
	VALIDATOR_ERROR_HAS_MIN_LENGTH: `Longueur minimale de $charLength requise`,
	VALIDATOR_ERROR_HAS_MAX_LENGTH: `Longueur maximale de $charLength requise`,
	VALIDATOR_ERROR_LENGTH: `La longueur des caractères doit être comprise entre $min et $max`,
	VALIDATOR_ERROR_PHONE: `Numéro de téléphone invalide`,
	VALIDATOR_ERROR_PASSWORD: `Mot de passe invalide`,
	VALIDATOR_ERROR_PASSWORD_CONFIRM: `Confirmation de mot de passe invalide`,
	VALIDATOR_ERROR_EMAIL: `Email non valide`,
};
