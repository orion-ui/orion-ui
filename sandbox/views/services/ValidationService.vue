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
				<div class="flex fd-c g-sm">
					<o-input
						v-model="user.name"
						class="grid-input"
						label="Test validation required et length"
						:validation-error-message="testLongErrorMessage"
						:validation="validator.rule('name')"/>
					<o-input
						v-model="user.name"
						class="grid-input"
						label="Test validation required et length"
						required/>
					<o-input
						v-model="user.name"
						class="grid-input"
						label="Test validation required et length"
						validation="required|length:3"/>
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
						:validation-error-message="testLongErrorMessage"
						:validation="validator.rule('phone')"
						mobile/>
					<o-password
						v-model="user.password.value"
						password-tooltip
						label="Mot de passe"
						:validation-error-message="testLongErrorMessage"
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
						:validation-error-message="testLongErrorMessage"
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
						:validation-error-message="testLongErrorMessage"
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
						:validation-error-message="testLongErrorMessage"
						:validation="validator.rule('toggleRequired')"
						size="xs"
						inline
						style="margin-right:20px"/>
					<o-datepicker
						v-model="user.datePicker"
						label="Date picker"
						required
						:validation-error-message="testLongErrorMessage"
						:validation="validator.rule('datePicker')"
						clearable/>
					<o-datepicker
						v-model:range="user.daterange.value"
						required
						clearable
						type="range"
						label="Date range"
						:validation-error-message="testLongErrorMessage"
						:validation="validator.rule('daterange.value')"/>
					<o-select
						v-model="user.select"
						label="Select"
						required
						clearable
						:validation-error-message="testLongErrorMessage"
						:validation="validator.rule('select')"
						:options="['oui', 'non', 'peut etre']"/>
					<o-textarea
						v-model="user.area"
						required
						clearable
						label="Text area"
						:validation-error-message="testLongErrorMessage"
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
// eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
const testLongErrorMessage = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';

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
	//name: 'required|length:5',
	name: (val?: string) => {
		return (val?.length ?? 0) > 5;
	},
	['login.email']: 'email',
	date: (val: number) => { return val > 10; },
	phone: 'required|phone:mobile',
	['password.value']: 'required|hasLowercase|hasUppercase|hasNumber',
	['password.passwordConfirm']: 'passwordConfirm:password.value',
	choice: 'required',
	radio: (val: any) => val === 'Peut être',
	toggleRequired: 'required',
	datePicker: 'required',
	['daterange.value']: 'required',
	select: 'required',
	area: 'required|length:10',
};

const passwordValidationMessages: OrionValidatorMessages = {
	hasLowercase: 'needs lowercase',
	hasUppercase: 'needs uppercase',
	hasNumber: 'needs numbers',
};

const validator = useValidation(user, tab);

function checkForm () : void {
	result = validator.validate();
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

</style>

