import { logger } from "@/classes/Logger";
import { randomBytes } from "crypto";
import { readFileSync } from "fs";
import { ServerOptions } from "https";
import { join } from "path";

function getCredentials(): ServerOptions {
	const credentials: ServerOptions = {};
	const cwd = process.cwd();

	try {
		const credentialsPath = join(cwd, "/credentials");
		const keyPath = join(credentialsPath, "/key.pem");
		const certPath = join(credentialsPath, "/cert.pem");

		credentials.key = readFileSync(keyPath, { encoding: "utf-8" });
		credentials.cert = readFileSync(certPath, { encoding: "utf-8" });
	} catch(error) {
		logger.error(`Couldn't load SSL credentials.\n${error}`);
		process.exit(1);
	}

	return credentials;
}

export default {
	PORT: parseInt(process.env.PORT) || 8443,
	CREDENTIALS: getCredentials(),
	JWT_SECRET: randomBytes(48).toString("hex")
};