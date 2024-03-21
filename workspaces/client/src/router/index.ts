import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router";
import { Routes } from "./Routes";
import { useAuthStore } from "@/stores/authStore";
import { unwrapErrorMessage } from "@/util/general/Errors";
import { UserAPI } from "@/classes/api/User";

const DEFAULT_ROUTE_TITLE = "Kingfisher";

function setTitle(to: RouteLocationNormalized) {
	document.title = typeof (to.meta.title as string | undefined) !== "undefined" ?
		to.meta.title as string :
		DEFAULT_ROUTE_TITLE;
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: Routes
});

router.beforeEach(async (to, from) => {
	const authStore = useAuthStore();

	if(!from.name && !authStore.authenticated) {
		const jwt = localStorage.getItem("jwt");
		if(jwt) {
			localStorage.removeItem("jwt");
			try {
				const user = (await new UserAPI().getUserDetails(jwt)).user;
				authStore.setAuthentication(jwt, user);
			} catch(error) {
				console.log(unwrapErrorMessage(error));
			}
		}
	}
	
	setTitle(to);
});

export default router;