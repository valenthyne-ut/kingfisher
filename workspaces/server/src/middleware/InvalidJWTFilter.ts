import { InvalidJWT } from "@/classes/database/models";
import config from "@/config";
import { unauthorizedResponse } from "@/util/api/Responses";
import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";

export const invalidJWTFilter: RequestHandler = async (request, response, next) => {
	const authHeader = request.headers.authorization;

	if(!authHeader || !authHeader.startsWith("Bearer ")) { return unauthorizedResponse(response); }

	const jwt = authHeader.substring(7, authHeader.length);
	const jwtInCache = await InvalidJWT.findOne({ where: { jwt: jwt } });
	if(jwtInCache) { return unauthorizedResponse(response); }

	try { verify(jwt, config.JWT_SECRET); } catch(error) { return unauthorizedResponse(response); }

	return next();
};