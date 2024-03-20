import RootView from "@/views/RootView.vue";
import type { RouteRecordRaw } from "vue-router";

export const routes: readonly RouteRecordRaw[] = [
	{
		path: "/",
		component: RootView,
		meta: {
			title: "Home"
		}
	}
];