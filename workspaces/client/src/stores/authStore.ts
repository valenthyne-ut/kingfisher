import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { User } from "@/classes/api/User/User";
import { AuthAPI } from "@/classes/api/Auth";

export const useAuthStore = defineStore("auth", () => {
	const jwt = ref<string>("");
	const user = ref<User | null>(null);

	const authAPI = new AuthAPI();

	const authenticated = computed(() => {
		return jwt.value.trim().length > 0;
	});

	function setAuthentication(newJwt: string, newUser: User | null) {
		jwt.value = newJwt;
		user.value = newUser;
	}

	async function clearAuthentication() {
		await authAPI.logout(jwt.value);
		setAuthentication("", null);
	}

	return { authenticated, jwt, user, setAuthentication, clearAuthentication };
});