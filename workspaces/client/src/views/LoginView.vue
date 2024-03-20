<script setup lang="ts">
	import FillButton from "@/components/buttons/FillButton.vue";
	import FormHolder from "../components/LoginView/FormHolder.vue";
	import FormInputs from "../components/LoginView/FormInputs.vue";
</script>

<template>
	<FormHolder>
		<h1 class="font-bold text-3xl self-center">Login</h1>
		<FormInputs class="mt-6"/>
		<FillButton class="
			mt-6 p-4 rounded font-bold text-xl text-white 
			bg-blue-600 hover:bg-blue-700 transition-colors
		">
			Submit
		</FillButton>
	</FormHolder>
</template>