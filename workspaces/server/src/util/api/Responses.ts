import { Response } from "express";

export function statusCodeErrorResponse(error: string, responseCode: number, response: Response) {
	response.status(responseCode).json({
		error: error
	});
}

export function notImplementedRespose(response: Response) {
	statusCodeErrorResponse("Not implemented.", 501, response);
}