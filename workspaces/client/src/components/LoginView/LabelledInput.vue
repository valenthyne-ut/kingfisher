<script setup lang="ts">
	const props = defineProps({
		id: {
			required: true,
			type: String
		},
		type: {
			required: true,
			type: String
		},
		label: {
			required: true,
			type: String
		},
		icon: {
			required: false,
			type: String
		}
	});
	
	const inputValue = defineModel({
		required: true,
		type: String
	});
</script>

<template>
	<label :for="props.id" class="
		relative flex border-2 rounded cursor-text 
		has-[input:focus]:outline has-[input:focus]:outline-blue-600
	">
		<span class="absolute -top-[10px] left-2 px-1 text-sm text-gray-600 bg-white">
			<span v-if="props.icon" class="me-1" :class="props.icon" aria-hidden="true"></span>{{ props.label }}
		</span>
		<input :id="props.id" :type="props.type" v-model="inputValue" class="w-0 grow p-4 outline-none">
		<slot></slot>
	</label>
</template>