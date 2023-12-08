<template>
	<div class="flex g-xs">
		<o-button
			color="brand"
			@click="checkForm">
			Check form
		</o-button>
		<o-button
			color="danger"
			outline
			@click="validator.hideValidationState()">
			Clear validation
		</o-button>
		<o-button
			color="warning"
			outline
			@click="validator.resetValidationState()">
			Reset
		</o-button>
		<o-alert :color="resultColor">
			Validation result : {{ result }}
		</o-alert>
	</div>

	<div class="mt-sm row row--grid">
		<div class="col-sm-6">
			<o-input
				v-model="user.name"
				class="grid-input"
				label="Test validation required et length"
				:validation="validator.rule('name')"/>
			<o-phone
				v-model="user.phone"
				label="Phone"
				:validation="validator.rule('phone')"
				mobile/>

			<o-password
				v-model="user.password.value"
				password-tooltip
				label="Mot de passe"
				:validation="validator.rule('password.value')"/>
		</div>

		<div class="col-sm-6">
			<div class="flex fd-c">
				<o-checkbox
					v-model="user.choice"
					required
					label="Check required"
					:validation="validator.rule('choice')"
					inline/>
				<o-radio
					v-model="user.radio"
					input-value="False"
					label="False"
					inline/>
				<o-radio
					v-model="user.radio"
					required
					input-value="True"
					label="True"
					:validation="validator.rule('radio')"
					inline/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useValidation } from '../../lib';

let result = ref(false);
const resultColor = ref<Orion.Color>('default');

let user = reactive({
	name: '',
	choice: false,
	radio: null,
	password: {
		value: null,
		passwordConfirm: null,
	},
	phone: {
		phoneCountryCode: 'FR',
		phoneNumber: null,
	},
});

let tab = {
	name: 'required|length:5',
	phone: 'phone:mobile',
	choice: 'required',
	['password.value']: 'required|hasLowercase|hasUppercase|hasNumber',
	radio: () => {return user.radio === 'True'; },
};


const validator = useValidation(user, tab);

function checkForm () : void {
	result.value = validator.validate(); ;
	if (result.value) {
		resultColor.value = 'success';
		validator.showValidationState();
	} else {
		resultColor.value = 'danger';
		validator.showValidationState();
	}
}
</script>

@hmr services/Validation.md

@hl {31,35,40,42,49,61,75-87,89-95,98,101,104,107}

@lang:en
#### Example with full code
@lang

@lang:fr
#### Exemple avec code
@lang
