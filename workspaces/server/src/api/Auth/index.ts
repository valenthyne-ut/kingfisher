import { logger } from "@/classes/Logger";
import { User } from "@/classes/database/models";
import config from "@/config";
import { JWTPayload } from "@/types/api/Auth/JWTPayload";
import { clientErrorResponse, notImplementedRespose, serverErrorResponse } from "@/util/api/Responses";
import { unwrapErrorMessage } from "@/util/general/Errors";
import { Router } from "express";
import { sign } from "jsonwebtoken";
import passport from "passport";

export const authRouter = Router()
	.get("/", (request, response) => {
		return notImplementedRespose(response);
	})
	.post("/", (request, response, next) => {
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
	});