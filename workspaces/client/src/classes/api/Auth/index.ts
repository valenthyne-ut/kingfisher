import { GenericAPI, HTTPMethods } from "..";
import type { User } from "../User/User";

export interface SuccessfulLoginResponse {
	jwt: string;
	user: User;
}

export class AuthAPI extends GenericAPI {
	constructor() {
		super(GenericAPI.API_DEFAULT_ROOT_PATH + "/auth");
	}

	async login(username: string, password: string): Promise<SuccessfulLoginResponse> {
		const requestData = JSON.stringify({
			username: username,
			password: password
		});

		return await this.performCall(this.rootPath, HTTPMethods.POST, { body: requestData }) as SuccessfulLoginResponse;
	}

	async logout(jwt: string): Promise<void> {
		const requestHeaders: HeadersInit = {
			"Authorization": "Bearer " + jwt
		};

		return await this.performCall(this.rootPath, HTTPMethods.DELETE, { headers: requestHeaders }) as void;
	}
}