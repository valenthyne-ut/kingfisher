<script setup lang="ts">
	import { computed, ref } from "vue";
	import LabelledInput from "./LabelledInput.vue";

	const username = ref<string>(""), password = ref<string>("");
	const timer = ref<{ timeLeft: number, intervalId: number }>({ timeLeft: -1, intervalId: -1 });
	const passwordVisible = ref<boolean>(false);

	const cPasswordInputType = computed(() => {
		return passwordVisible.value ? "text" : "password";
	});

	const cEyeStyle = computed(() => {
		return passwordVisible.value ? "bi-eye-fill" : "bi-eye-slash-fill";
	});

	function togglePasswordVisibility() {
		switch(passwordVisible.value) {
		case true: default:
			passwordVisible.value = false;
			
			timer.value.timeLeft = 0;
			clearInterval(timer.value.intervalId);
			timer.value.intervalId = -1;
			break;

		case false:
			passwordVisible.value = true;

			timer.value.timeLeft = 5;
			timer.value.intervalId = setInterval(() => {
				timer.value.timeLeft -= 1;
				if(timer.value.timeLeft <= 0) {
					passwordVisible.value = false;
					clearInterval(timer.value.intervalId);
				}
			}, 1000);
			break;
		}
	}
</script>

<template>
	<div class="flex flex-col">
		<LabelledInput id="username" type="text" label="Username" icon="bi-person-badge-fill" v-model="username"/>
		<LabelledInput id="password" :type="cPasswordInputType" label="Password" icon="bi-key" v-model="password" class="mt-4">
			<div class="py-4 pe-4 flex text-gray-600">
				<span v-if="passwordVisible" class="ms-2">{{ timer.timeLeft }}s</span>
				<button type="button" @click="togglePasswordVisibility" aria-hidden="true" class="
					w-6 ms-1 rounded-full outline-blue-600
				">
					<span :class="cEyeStyle"></span>
				</button>
			</div>
		</LabelledInput>
	</div>
</template>