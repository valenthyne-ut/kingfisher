import { DirtyLoginParameters } from "@/types/api/Auth";
import { validatePrimitiveRequestParameter } from "@/util/api/Requests";
import { clientErrorResponse, invalidRequestParameterResponse } from "@/util/api/Responses";
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
	if(!validatePrimitiveRequestParameter(username, "string")) { return invalidRequestParameterResponse("username", "string", response); }
	if(!validatePrimitiveRequestParameter(password, "string")) { return invalidRequestParameterResponse("password", "string", response); }
	if(!username || username.trim().length == 0) { return clientErrorResponse("Username is required.", response); }
	if(!password || password.trim().length == 0) { return clientErrorResponse("Password is required.", response); }
	return next();
};