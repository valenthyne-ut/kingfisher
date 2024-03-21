import { AuthAPI, type SuccessfulLoginResponse } from "@/classes/api/Auth";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginStore = defineStore("login", () => {
	const username = ref<string>(""), password = ref<string>("");
	
	const authAPI = new AuthAPI();

	async function attemptLogin(): Promise<SuccessfulLoginResponse> {
		if(!username.value || username.value.trim().length == 0) { throw new Error("Username is required."); }
		if(!password.value || username.value.trim().length == 0) { throw new Error("Password is required."); }

		return await authAPI.login(username.value, password.value);
	}

	return { username, password, attemptLogin };
});