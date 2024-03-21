import { GenericAPI, HTTPMethods } from "..";
import { User } from "./User";

export interface UserDetailsResponse {
	user: User;
}

export class UserAPI extends GenericAPI {
	constructor() {
		super(GenericAPI.API_DEFAULT_ROOT_PATH + "/user");
	}

	async getUserDetails(jwt: string): Promise<UserDetailsResponse> {
		const requestHeaders: HeadersInit = {
			"Authorization": "Bearer " + jwt
		};

		return await this.performCall(this.rootPath, HTTPMethods.GET, { headers: requestHeaders }) as UserDetailsResponse;
	}
}