<script setup lang="ts">
	import SideBar from "@/components/RootView/SideBar.vue";
	import TabHolder from "@/components/RootView/TabHolder.vue";
</script>

<template>
	<SideBar />
	<TabHolder>
		<RouterView />
	</TabHolder>
</template>