import { DirtyUserCreationParameters } from "@/types/api/User";
import { validatePrimitiveRequestParameter } from "@/util/api/Requests";
import { invalidRequestParameterResponse } from "@/util/api/Responses";
import { RequestHandler } from "express";

export const userCreationParameterFilter: RequestHandler<
	unknown, 
	unknown, 
	DirtyUserCreationParameters
> = (request, response, next) => {
	const { username, password } = request.body;
	if(!validatePrimitiveRequestParameter(username, "string")) { return invalidRequestParameterResponse("username", "string", response); }
	if(!validatePrimitiveRequestParameter(password, "string")) { return invalidRequestParameterResponse("password", "string", response); }
	return next();
};