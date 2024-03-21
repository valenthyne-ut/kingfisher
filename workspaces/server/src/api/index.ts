import { Router } from "express";
import { authRouter } from "./Auth";
import { userRouter } from "./User";

export const apiRouter = Router()
	.use("/auth", authRouter)
	.use("/user", userRouter);