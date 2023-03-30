<template>
	<o-page title="Password">
		<div class="row">
			<div class="col-sm-4">
				<o-card title="Test for prefill issues">
					<o-input
						v-model="form.login"
						name="username"
						label="Login"/>
					<o-password
						v-model="form.password"
						name="password"
						label="Password"/>
				</o-card>
			</div>
			<div class="col-sm-4">
				<o-input
					v-model="form.login"
					label="Login"/>
			</div>
		</div>
	</o-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const form = reactive({
	login: undefined,
	password: undefined,
});
</script>
