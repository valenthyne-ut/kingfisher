<script setup lang="ts">
	import router from "@/router";
	import { computed } from "vue";

	const props = defineProps({
		expanded: {
			required: true,
			type: Boolean
		},
		linkTo: {
			required: true,
			type: String
		},
		text: {
			required: true,
			type: String
		},
		icon: {
			required: true,
			type: String
		}
	});

	const cSelected = computed(() => {
		return router.currentRoute.value.path == props.linkTo ? "bg-blue-600": "bg-zinc-700/75 hover:bg-zinc-600";
	});

	const cCollapsed = computed(() => {
		return props.expanded ? "": "w-16 h-16 flex justify-center items-center text-2xl";
	});

	const cText = computed(() => {
		return props.expanded ? props.text : "";
	});
</script>

<template>
	<RouterLink :to="props.linkTo" class="p-3 flex rounded transition-colors" :class="[cSelected, cCollapsed]">
		<span class="font-bold text-white whitespace-nowrap">
			<span :class="props.icon"></span> {{ cText }}
		</span>
	</RouterLink>
</template>