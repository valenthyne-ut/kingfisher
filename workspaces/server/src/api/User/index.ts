import { notImplementedRespose } from "@/util/api/Responses";
import { Router } from "express";

export const userRouter = Router()
	.get("/", (request, response) => {
		return notImplementedRespose(response);
	})
	.post("/", (request, response) => {
		return notImplementedRespose(response);
	});