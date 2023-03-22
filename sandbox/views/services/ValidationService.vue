<template>
	<o-page title="Validation Service">
		<o-section title="Fields and form Validation">
			<template #actions>
				<o-button
					color="brand"
					@click="checkForm">
					Vérifions ça !
				</o-button>
				<o-button
					color="danger"
					outline
					@click="validator.hideValidationState()">
					Effaçons ça !
				</o-button>
				<o-button
					color="warning"
					outline
					@click="validator.resetValidationState()">
					Resetons ça !
				</o-button>
			</template>
		</o-section>

		<div class="row row--grid">
			<div class="col-sm-6">
				<o-input
					v-model="user.name"
					class="grid-input"
					label="Test validation required et length"
					:validation="validator.rule('name')"/>
				<o-input
					v-model="user.login.email"
					type="email"
					class="grid-input"
					label="Test validation email"
					validation-error-message="Email invalide"
					:validation="validator.rule('login.email')"/>
				<o-input
					v-model="user.date"
					class="grid-input"
					label="Test validation fonction"
					:validation="validator.rule('date')"/>
				<o-phone
					v-model="user.phone"
					label="téléphone"
					:validation="validator.rule('phone')"
					mobile/>

				<o-password
					v-model="user.password.value"
					password-tooltip
					label="Mot de passe"
					:validation="validator.rule('password.value')"
					:validation-messages="passwordValidationMessages"/>

				<o-password
					v-model="user.password.passwordConfirm"
					password-tooltip
					label="Confirm password"
					:validation="validator.rule('password.passwordConfirm')"/>

				<o-checkbox
					v-model="user.choice"
					required
					label="On coche ?"
					:validation="validator.rule('choice')"
					inline
					style="margin-right:20px"/>

				<o-radio
					v-model="user.radio"
					input-value="Oui"
					label="Oui"
					inline
					style="margin-right:20px"/>
				<o-radio
					v-model="user.radio"
					input-value="Non"
					label="Non"
					inline
					style="margin-right:20px"/>
				<o-radio
					v-model="user.radio"
					required
					input-value="Peut être"
					label="Peut être"
					:validation="validator.rule('radio')"
					inline
					style="margin-right:20px"/>

				<o-toggle
					v-model="user.toggle"
					label="Toggle"
					size="xs"
					inline
					style="margin-right:20px"/>

				<o-toggle
					v-model="user.toggleRequired"
					label="Required"
					required
					:validation="validator.rule('toggleRequired')"
					size="xs"
					inline
					style="margin-right:20px"/>

				<o-datepicker
					v-model="user.datePicker"
					label="Date picker"
					required
					:validation="validator.rule('datePicker')"
					clearable/>

				<o-datepicker
					v-model:range="user.daterange.value"
					required
					clearable
					type="range"
					label="Date range"
					:validation="validator.rule('daterange.value')"/>

				<o-select
					v-model="user.select"
					label="Select"
					required
					clearable
					:validation="validator.rule('select')"
					:options="['oui', 'non', 'peut etre']"/>

				<o-textarea
					v-model="user.area"
					required
					clearable
					label="Text area"
					:validation="validator.rule('area')"
					@submit="onSubmit()"/>

				<o-alert :color="resultColor">
					Le résultat est .... {{ result }}
				</o-alert>

				<hr>

				<o-input
					v-model="testMail"
					label="test mail"
					validation="required|email"/>
				<o-input
					v-model="testMail"
					required
					label="test mail length"
					:validation="validateTestMail"/>
			</div>

			<div class="col-sm-6">
				<pre>{{ user }}</pre>
			</div>
		</div>
	</o-page>
</template>


<script setup lang="ts">
import { useValidation, useNotif } from 'lib';
import { ref, reactive } from 'vue';

const testMail = ref<string>();
const validateTestMail = () => (testMail.value?.length ?? 0) > 5;

let user = reactive({
	name: '',
	toggle: false,
	toggleRequired: false,
	choice: false,
	radio: null,
	login: { email: null },
	date: 0,
	phone: {
		phoneCountryCode: 'FR',
		phoneNumber: null,
	},
	password: {
		value: null,
		passwordConfirm: null,
	},
	datePicker: null,
	daterange: {
		value: null,
		label: 'Label daterange',
	},
	select: null,
	area: null,
});

let result = false;


const resultColor = ref<Orion.Color>('default');

let tab = {
	name: 'required|length:5',
	['login.email']: 'email',
	date: () => {
		return user.date > 10;
	},
	phone: 'phone:mobile',
	['password.value']: 'required|hasLowerase|hasUppercase|hasNumber',
	['password.passwordConfirm']: 'passwordConfirm:password.value',
	choice: 'required',
	radio: () => {return user.radio === 'Peut être'; },
	toggleRequired: 'required',
	datePicker: 'required',
	['daterange.value']: 'required',
	select: 'required',
	area: 'required|length:10',
};

const passwordValidationMessages: OrionValidatorMessages = {
	hasLowercase: 'faut des minuscules',
	hasUppercase: 'faut des majusculues',
	hasNumber: 'faut des noumbeurs',
};

const validator = useValidation(user, tab);

function checkForm () : void {
	result = validator.validate(); ;
	if (result) {
		resultColor.value = 'brand';
		validator.showValidationState();
	} else {
		resultColor.value = 'danger';
		validator.showValidationState();
	}
}

function onSubmit () {
	useNotif.info('submitted');
}

</script>

<style lang="less">

.grid-input {
	margin-bottom: 40px;
}
</style>

