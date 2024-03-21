<script setup lang="ts">
	import FillButton from "@/components/buttons/FillButton.vue";
	import FormHolder from "../components/LoginView/FormHolder.vue";
	import FormInputs from "../components/LoginView/FormInputs.vue";
	import { useLoginStore } from "@/stores/loginStore";
	import { ref } from "vue";
	import { unwrapErrorMessage } from "@/util/general/Errors";
	import vAlert from "@/components/vAlert.vue";

	const loginState = ref<{ successful: boolean, message: string }>({ successful: false, message: "" });

	const loginStore = useLoginStore();

	async function login() {
		loginState.value = { successful: false, message: "" };
		try {
			const authDetails = await loginStore.attemptLogin();
			loginState.value = { successful: true, message: "Successfully logged in." };
		} catch(error) {
			loginState.value = { successful: false, message: unwrapErrorMessage(error) };
		}
	}
</script>

<template>
	<FormHolder>
		<h1 class="font-bold text-3xl self-center">Login</h1>
		<vAlert :type="loginState.successful ? 'success' : 'error'" :dismissable="true" v-model="loginState.message" class="mt-4"/>
		<FormInputs class="mt-6"/>
		<FillButton type="submit" @click.prevent="login" class="
			mt-6 p-4 rounded font-bold text-xl text-white 
			bg-blue-600 hover:bg-blue-700 transition-colors
		">
			Submit
		</FillButton>
	</FormHolder>
</template>