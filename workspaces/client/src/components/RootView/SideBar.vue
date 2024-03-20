<script setup lang="ts">
	import { ref, computed } from "vue";
	import NavigationTab from "./NavigationTab.vue";
	import { NavLinks } from "@/router/Routes";

	const expanded = ref<boolean>(true);

	const cExpanded = computed(() => {
		return expanded.value ? "w-72" : "w-24";	
	});

	const cShowTitle = computed(() => {
		return expanded.value ? "Kingfisher" : "";
	});

	function toggleExpanded() {
		expanded.value = !expanded.value;
	}
</script>

<template>
	<section :class="cExpanded" class="
		ps-4 py-4 flex 
		bg-zinc-800 shadow-[rgba(0,0,0,0.5)_0px_0px_8px_0px] transition-[width]
	">
		<div class="w-0 grow flex flex-col">
			<span>
				<h1 class="font-bold text-3xl text-center text-white whitespace-nowrap">
					<span class="bi-feather"></span> {{ cShowTitle }}
				</h1>
				<hr class="mt-3 border-zinc-600">
			</span>
			<nav class="h-full pt-3 flex flex-col gap-2">
				<NavigationTab v-for="tab, index in NavLinks" :key="index"
					:expanded="expanded" :link-to="tab.linkTo" :text="tab.text" :icon="tab.icon"
				/>
			</nav>
		</div>
		<button type="button" @click="toggleExpanded" class="
			z-10 relative -right-2
			border border-zinc-600
			self-center rounded bg-zinc-700 hover:bg-zinc-600 transition-colors
		">
			<span class="h-64 flex items-center text-white bi-grip-vertical"></span>
		</button>
	</section>
</template>