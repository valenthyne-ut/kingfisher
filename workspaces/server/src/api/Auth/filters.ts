import { DirtyLoginParameters } from "@/types/api/Auth";
import { clientErrorResponse } from "@/util/api/Responses";
import { RequestHandler } from "express";

/* 
	You'd think passport's local strategy SURELY
	would check to see if the username and password
	fields are empty by itself, right?
	
	WELL APPARENTLY NOT.

	https://stackoverflow.com/questions/46601268/passport-js-not-calling-localstrategy-if-fields-are-empty
*/
export const loginParameterFilter: RequestHandler<
	unknown,
	unknown,
	DirtyLoginParameters
> = (request, response, next) => {
	const { username, password } = request.body;
	if(!username || username.trim().length == 0) { return clientErrorResponse("Username is required.", response); }
	if(!password || password.trim().length == 0) { return clientErrorResponse("Password is required.", response); }
	return next();
};