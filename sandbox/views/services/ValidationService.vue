<template>
	<o-page title="Validation Service">
		<o-section title="Fields and form Validation">
			<template #actions>
				<o-button
					color="primary"
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
				<o-button
					color="info"
					outline
					@click="logResults()">
					log results
				</o-button>
			</template>
		</o-section>

		<div class="row row--grid">
			<div class="col-sm-6">
				<div class="flex fd-c g-16">
					<o-input
						v-model="user.required"
						label="required only"
						required
						disabled
						type="email"/>
					<o-input
						v-model="user.customRuleInTemplate"
						label="custom rule in template"
						hint="example of hint text"
						:validation="(val?: string) => (val?.length ?? 0) > 2"
						validation-error-message="nénéné"/>
					<o-input
						v-model="user.customValidatorRuleInTemplate"
						label="custom ValidatorRule in template"
						:validation="(val?: string) => ({
							result: (val?.length ?? 0) > 2,
							message: 'hoho',
							level: 'warning',
						})"/>
					<o-input
						v-model="user.emailRequired"
						class="grid-input"
						label="rule emailRequired"
						:validation="validator.rule('emailRequired')"/>
					<o-input
						v-model="user.name"
						class="grid-input"
						label="rule name"
						:validation="validator.rule('name')"/>
					<o-input
						v-model="user.nameForExtendedRule"
						class="grid-input"
						label="Test validation extended rule"
						:validation="validator.rule('nameForExtendedRule')"/>
					<o-datepicker
						v-model="user.date"
						class="grid-input"
						label="rule date"
						:validation="validator.rule('date')"/>
					<!-- <o-input
						v-model="user.name2"
						class="grid-input"
						label="Test validation (string) required and length"
						validation="required|length:3"/> -->
					<o-input
						v-model="user.name2"
						class="grid-input"
						label="Test validation (string) required and length"
						validation="required:|length:3,5"/>
					<o-phone
						ref="refPhone"
						v-model="user.phone.phoneNumber"
						label="téléphone"
						:validation="validator.rule('phone')"
						mobile/>
					<pre>{{ user.phone }}</pre>
					<!-- <o-input
						v-model="user.emailRequired"
						type="email"
						class="grid-input"
						label="Test validation email"
						validation-error-message="Email invalide"
						:validation="validator.rule('emailRequired')"/>
					<o-password
						v-model="user.password"
						label="Mot de passe"
						:validation="(val?:string) => !!(val?.length && val.length >= 3)"
						validation-error-message="hey 3 char. min"/> -->
					<o-password
						v-model="user.password"
						password-tooltip
						label="Mot de passe"
						:validation="validator.rule('password')"/>
					<o-password
						v-model="user.passwordConfirm"
						password-tooltip
						label="Confirm password"
						password-to-confirm
						:validation="validator.rule('passwordConfirm')"/>
					<o-checkbox
						v-model="user.choice"
						label="On coche ?"
						color="primary"/>
					<o-checkbox
						v-model="user.choice"
						label="On coche ?"
						required
						:validation-error-message="testLongErrorMessage"
						:validation="validator.rule('choice')"/>

					<div class="flex g-16">
						<o-radio
							v-model="user.radio"
							input-value="Oui"
							label="Oui"
							color="primary"
							:validation="validator.rule('radio')"/>
						<o-radio
							v-model="user.radio"
							input-value="Non"
							label="Non"
							color="primary"
							:validation="validator.rule('radio')"/>
						<o-radio
							v-model="user.radio"
							input-value="Peut être"
							label="Peut être"
							color="primary"
							:validation="validator.rule('radio')"/>
					</div>
					<o-toggle
						v-model="user.toggle"
						label="Toggle"
						color="primary"/>
					<o-toggle
						v-model="user.toggleRequired"
						label="Required"
						required
						:validation-error-message="testLongErrorMessage"
						:validation="validator.rule('toggleRequired')"/>
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
						:validation="validator.rule('area')"/>
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
import { useValidation } from 'lib';
import { Validator } from 'utils/Validator';
import { reactive, ref } from 'vue';

const testLongErrorMessage = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';
const refPhone = ref<OrionPhone>();

let user = reactive({
	required: 'tutu' as Undef<string>,
	customRuleInTemplate: undefined as Undef<string>,
	customValidatorRuleInTemplate: undefined as Undef<string>,
	name: undefined as Undef<string>,
	name2: undefined as Undef<string>,
	nameForExtendedRule: undefined as Undef<string>,
	toggle: false,
	toggleRequired: false,
	choice: false,
	radio: undefined,
	emailRequired: undefined as Undef<string>,
	date: undefined as Undef<Date>,
	phone: {
		phoneCountryCode: 'FR' as Orion.Country['code'],
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

const resultColor = ref<Orion.Color>('neutral');

const validator = useValidation(user, {
	password: 'required|password',
	passwordConfirm: Validator.rules.passwordConfirm(() => user.password),
	// emailRequired: val => !!val?.length && val.length > 10 && Validator.rules.email()(val).result,
	emailRequired: new Validator([
		Validator.rules.required(),
		Validator.rules.email('oulala'),
	]),
	// name: 'required|length:2',
	name: new Validator([
		Validator.rules.required(`Ce champ est requis`),
		Validator.rules.hasUppercase(),
		// Validator.rules.hasMinLength(5),
		// Validator.rules.hasMaxLength(10),
		Validator.rules.length(2),
	]),
	/* nameForExtendedRule: new Validator([
		val => ({
			result: (val?.length ?? 0) > 2,
			message: 'length supérieure à 2',
			level: 'error',
		}),
		val => ({
			result: !!val?.includes('toto'),
			message: 'doit contenir "toto"',
			level: 'error',
		}),
	]), */
	nameForExtendedRule: (val) => {
		if (val?.length) {
			return {
				result: (val?.length ?? 0) > 2,
				message: 'length supérieure à 2',
				level: 'error',
				meta: 'lengthSup2',
			};
		}
		return true;
	},
	/* customRuleInTemplate: val => ({
		...Validator.rules.required()(val),
		meta: 213,
	}), */
	date: (val) => {
		if (val?.getFullYear() === 2023) {
			if (val.getMonth() === 11) {
				return {
					result: false,
					level: 'error',
					message: `date should be before december`,
				};
			}
			if (val.getMonth() < 4) {
				return {
					result: false,
					level: 'error',
					message: `date should be after may`,
				};
			}
			return true;
		}
		return true;
	},
	phone: new Validator<typeof user.phone>([
		Validator.rules.required(),
		() => ({
			result: refPhone.value?.isValidMobile() ?? false,
			message: 'phone number must be mobile phone',
			level: 'error',
		}),
	]),
	choice: Validator.rules.required(),
	radio: Validator.rules.required(),
	toggleRequired: Validator.rules.required(),
	datePicker: Validator.rules.required(),
	daterange: new Validator([
		val => ({
			level: 'warning',
			result: Validator.rules.required()(val).result,
			message: `value required`,
		}),
	]),
	select: new Validator([
		val => ({
			level: 'warning',
			result: Validator.rules.required()(val).result,
			message: `value required`,
		}),
	]),
	area: Validator.rules.hasMaxLength(10),
});

function checkForm (): void {
	result = validator.validateAndShowState();
	if (result) {
		resultColor.value = 'primary';
		// validator.showValidationState();
	}
	else {
		resultColor.value = 'danger';
		// validator.showValidationState();
	}
}

function logResults (): void {
	// eslint-disable-next-line no-console
	console.log(`🚀  validator.getResults():`, validator.getResults());
}

</script>

<style lang="less">
</style>
