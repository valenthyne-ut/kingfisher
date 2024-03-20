export function unwrapErrorMessage(error: Error | string | unknown): string {
	let message: string | undefined;

	if(error instanceof Error) { message = error.message; }
	else if(typeof error === "string") { message = error; }

	return message !== undefined ? message : "Unknown error occurred.";
}