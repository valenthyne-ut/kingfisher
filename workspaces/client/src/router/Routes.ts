import { useAuthStore } from "@/stores/authStore";
import RootView from "@/views/RootView.vue";
import type { RouteRecordRaw } from "vue-router";

export const Routes: readonly RouteRecordRaw[] = [
	{
		path: "/",
		component: RootView,
		children: [
			{
				path: "",
				component: () => import("@/components/RootView/tabs/HomeTab/HomeTab.vue"),
				meta: {
					title: "Home"
				}
			},
			{
				path: "files",
				component: () => import("@/components/RootView/tabs/FilesTab/FilesTab.vue"),
				meta: {
					title: "Files"
				}
			},
			{
				path: "settings",
				component: () => import("@/components/RootView/tabs/SettingsTab/SettingsTab.vue"),
				meta: {
					title: "Settings"
				}
			}
		],
		beforeEnter: async () => {
			const authStore = useAuthStore();
			if(!authStore.authenticated) { return { path: "/login" }; }
		}
	},
	{
		path: "/login",
		component: () => import("@/views/LoginView.vue"),
		beforeEnter: async () => {
			const authStore = useAuthStore();
			if(authStore.authenticated) { return { path: "/" }; }
		}
	}
];

export const NavLinks: readonly { linkTo: string, text: string, icon: string }[] = [
	{
		linkTo: "/",
		text: "Home",
		icon: "bi-house-fill"
	},
	{
		linkTo: "/files",
		text: "Files",
		icon: "bi-folder-fill"
	},
	{
		linkTo: "/settings",
		text: "Settings",
		icon: "bi-gear-fill"
	}
];