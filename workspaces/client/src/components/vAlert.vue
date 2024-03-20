<script setup lang="ts">
	import { computed } from "vue";

	const props = defineProps({
		type: {
			type: String,
			required: true
		},
		dismissable: {
			type: Boolean,
			required: false,
			default: false
		}
	});

	const text = defineModel({
		type: String,
		required: true
	});

	const cAlertType = computed(() => {
		let style = "";

		switch(props.type) {
		case "error":
			style = "bg-red-200";
			break;
		case "success":
			style = "bg-green-200";
			break;
		}
		return style;
	});

	const cVisible = computed(() => {
		return text.value.trim().length > 0 ? "flex" : "hidden";
	});

	function dismiss() {
		text.value = "";
	}
</script>

<template>
	<div class="w-full p-4 items-center rounded" :class="[cAlertType, cVisible]">
		{{ text }}
		<button v-if="props.dismissable" type="button" class="ms-auto" @click="dismiss">
			<span class="bi-x-lg text-lg"></span>
		</button>
	</div>
</template>