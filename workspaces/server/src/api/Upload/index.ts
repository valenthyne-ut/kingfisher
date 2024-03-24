import { notImplementedRespose } from "@/util/api/Responses";
import { Router } from "express";

export const uploadRouter = Router()
	.get("/", (request, response) => {
		return notImplementedRespose(response);
	})
	.get("/:id", (request, response) => {
		return notImplementedRespose(response);
	})
	.post("/:id", (request, response) => {
		return notImplementedRespose(response);
	})
	.put("/:id", (request, response) => {
		return notImplementedRespose(response);
	})
	.patch("/:id", (request, response) => {
		return notImplementedRespose(response);
	})
	.delete("/:id", (request, response) => {
		return notImplementedRespose(response);
	});