import { Router } from "express";

export const authRouter = Router()
	.get("/", (request, response) => {
		response.status(501).json({ error: "Not implemented." });
	})
	.post("/", (request, response) => {
		response.status(501).json({ error: "Not implemented." });
	});