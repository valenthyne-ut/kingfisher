import { clientErrorResponse, notImplementedRespose, serverErrorResponse } from "@/util/api/Responses";
import { Request, Router } from "express";
import { userCreationParameterFilter } from "./filters";
import { UserCreationParameters } from "@/types/api/User";
import { User } from "@/classes/database/models";
import { hashSync } from "bcrypt";
import { unwrapErrorMessage } from "@/util/general/Errors";
import config from "@/config";

export const userRouter = Router()
	.get("/", (request, response) => {
		return notImplementedRespose(response);
	})
	.post("/", userCreationParameterFilter, async (request: Request<unknown, unknown, UserCreationParameters>, response) => {
		try {
			const { username, password } = request.body;

			const user = await User.findOne({ where: { username: username } });
			if(user != null) { return clientErrorResponse("A user with the provided name already exists.", response); }

			await User.create({
				username: username,
				password: hashSync(password, config.HASH_COST)
			});

			return response.status(201).json({});
		} catch(error) {
			console.log(unwrapErrorMessage(error));
			return serverErrorResponse("Something went wrong while creating your user.", response);
		}
	});