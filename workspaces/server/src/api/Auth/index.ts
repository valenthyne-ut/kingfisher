import { logger } from "@/classes/Logger";
import { InvalidJWT, User } from "@/classes/database/models";
import config from "@/config";
import { JWTPayload } from "@/types/api/Auth/JWTPayload";
import { clientErrorResponse, serverErrorResponse } from "@/util/api/Responses";
import { unwrapErrorMessage } from "@/util/general/Errors";
import { Router } from "express";
import { sign } from "jsonwebtoken";
import passport from "passport";
import { loginParameterFilter } from "./filters";
import { invalidJWTFilter } from "@/middleware/InvalidJWTFilter";

export const authRouter = Router()
	.get("/", invalidJWTFilter, passport.authenticate("jwt", { session: false }), (request, response) => {
		return response.status(200).json({});
	})
	.post("/", loginParameterFilter, (request, response, next) => {
		passport.authenticate("password", { session: false }, (error: Error | null, user: User) => {
			if(error) { return clientErrorResponse(error.message, response); }

			request.login(user, { session: false }, async (error) => {
				if(error) {
					logger.error(unwrapErrorMessage(error));
					return serverErrorResponse("Something went wrong while logging you in.", response);
				}

				const jwtPayload: JWTPayload = {
					user: {
						username: user.username
					},
					exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
				};

				const jwt = sign(jwtPayload, config.JWT_SECRET);

				return response.status(200).json({
					jwt: jwt,
					user: jwtPayload.user
				});
			});
		})(request, response, next);
	})
	.delete("/", invalidJWTFilter, passport.authenticate("jwt", { session: false }), async (request, response) => {
		try {
			const authHeader = request.headers.authorization!;
			const jwt = authHeader.substring(7, authHeader.length);

			await InvalidJWT.create({ jwt: jwt });
			return response.status(200).json({});
		} catch(error) {
			logger.error(unwrapErrorMessage(error));
			return serverErrorResponse("Something went wrong while logging you out.", response);
		}
	});