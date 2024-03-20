import { Response } from "express";

export function statusCodeErrorResponse(error: string, responseCode: number, response: Response) {
	response.status(responseCode).json({
		error: error
	});
}

export function notImplementedRespose(response: Response) {
	statusCodeErrorResponse("Not implemented.", 501, response);
}

export function clientErrorResponse(error: string, response: Response) {
	statusCodeErrorResponse(error, 400, response);
}

export function serverErrorResponse(error: string, response: Response) {
	statusCodeErrorResponse(error, 500, response);
}