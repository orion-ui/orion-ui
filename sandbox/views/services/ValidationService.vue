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
						label="required only"
						required/>
					<o-input
						v-model="user.name"
						class="grid-input"
						label="Validation with custom function"
						:validation-error-message="testLongErrorMessage"
						:validation="(val?: string) => (val?.length ?? 0) > 2"/>
					<o-input
						v-model="user.name"
						class="grid-input"
						label="Test validation simple Validator msdlkqhqdsfkljh"
						:validation="validator.rule('name')"/>
					<!-- <o-input
						v-model="user.nameForExtendedRule"
						class="grid-input"
						label="Test validation extended rule"
						:validation="validator.rule('nameForExtendedRule')"/>
					<o-input
						v-model="user.name"
						class="grid-input"
						label="Test validation (string) required and length"
						validation="required|length:3"/>
					<o-input
						v-model="user.login"
						type="email"
						class="grid-input"
						label="Test validation email"
						validation-error-message="Email invalide"
						:validation="validator.rule('login')"/>
					<o-datepicker
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
						v-model="user.password"
						label="Mot de passe"
						:validation="(val?:string) => !!(val?.length && val.length >= 3)"
						validation-error-message="hey 3 char. min"/>
					<o-password
						v-model="user.password"
						password-tooltip
						label="Mot de passe"/>
					<o-password
						v-model="user.passwordConfirm"
						password-tooltip
						label="Confirm password"
						:password-to-confirm="user.password"/>
					<o-checkbox
						v-model="user.choice"
						label="On coche ?"
						color="brand"/>
					<o-checkbox
						v-model="user.choice"
						label="On coche ?"
						required
						:validation-error-message="testLongErrorMessage"
						:validation="validator.rule('choice')"/>

					<div class="flex g-sm">
						<o-radio
							v-model="user.radio"
							input-value="Oui"
							label="Oui"
							color="brand"
							:validation="validator.rule('radio')"/>
						<o-radio
							v-model="user.radio"
							input-value="Non"
							label="Non"
							color="brand"
							:validation="validator.rule('radio')"/>
						<o-radio
							v-model="user.radio"
							input-value="Peut être"
							label="Peut être"
							color="brand"
							:validation="validator.rule('radio')"/>
					</div>
					<o-toggle
						v-model="user.toggle"
						label="Toggle"
						size="xs"
						color="brand"/>
					<o-toggle
						v-model="user.toggleRequired"
						label="Required"
						required
						:validation-error-message="testLongErrorMessage"
						:validation="validator.rule('toggleRequired')"
						size="xs"/>
					<o-datepicker
						v-model="user.datePicker"
						label="Date picker"
						:validation-error-message="testLongErrorMessage"
						:validation="validator.rule('datePicker')"
						clearable/>
					<o-datepicker
						v-model:range="user.daterange"
						required
						clearable
						type="range"
						label="Date range"
						:validation-error-message="testLongErrorMessage"
						:validation="validator.rule('daterange')"/>
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
						:validation="validator.rule('area')"/> -->
					<o-alert :color="resultColor">
						Le résultat est .... {{ result }}
					</o-alert>
					<hr>
					<!-- <o-input
						v-model="testMail"
						label="test mail"
						validation="required|email"/>
					<o-input
						v-model="testMail"
						required
						label="test mail length"
						:validation="validateTestMail"/> -->
				</div>
			</div>

			<div class="col-sm-6">
				<pre>{{ user }}</pre>
			</div>
		</div>
	</o-page>
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useValidation } from 'lib';
import { Validator } from 'utils/Validator';

// eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
const testLongErrorMessage = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';

let user = reactive({
	name: undefined as Undef<string>,
	nameForExtendedRule: undefined as Undef<string>,
	toggle: false,
	toggleRequired: false,
	choice: false,
	radio: undefined,
	login: undefined as Undef<string>,
	date: undefined as Undef<Date>,
	phone: {
		phoneCountryCode: 'FR',
		phoneNumber: undefined as Undef<string>,
	},
	password: undefined,
	passwordConfirm: undefined,
	datePicker: undefined,
	daterange: undefined,
	select: undefined,
	area: undefined,
});

let result = false;

const resultColor = ref<Orion.Color>('default');

const validator = useValidation(user, {
	login: val => !!val?.length && val.length > 10 && Validator.rules.email()(val),
	name: new Validator([
		/* Validator.rules.required(),
		Validator.rules.hasUppercase(),
		Validator.rules.hasMinLength(5), */
		Validator.rules.hasMaxLength(10),
	]),
	/* nameForExtendedRule: new Validator([
		{
			level: 'error',
			rule: val => Validator.rules.required()(user.name)
				? Validator.rules.required()(val)
				: true,
			message: `this field is required`,
		},
		{
			level: 'warning',
			rule: Validator.rules.hasMinLength(3),
			message: `should be at least 3 char. long`,
		},
		{
			level: 'warning',
			rule: () => !!user.nameForExtendedRule?.includes('toto'),
			message: `should contain 'toto'`,
		},
	]),
	date: Validator.rules.required(),
	phone: new Validator<typeof user.phone>([
		{
			level: 'error',
			rule: value => value?.phoneCountryCode === 'DE',
			message: 'phone should be german',
		},
	]),
	choice: Validator.rules.required(),
	radio: Validator.rules.required(),
	toggleRequired: Validator.rules.required(),
	datePicker: Validator.rules.required(),
	daterange: new Validator([
		{
			level: 'warning',
			rule: Validator.rules.required(),
			message: `value required`,
		},
	]),
	select: new Validator<string>([
		{
			level: 'error',
			rule: val => val === 'oui',
		},
	]),
	area: Validator.rules.hasMaxLength(10), */
});


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

</script>

<style lang="less">
</style>

