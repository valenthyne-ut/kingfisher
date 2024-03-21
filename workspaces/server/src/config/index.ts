import { logger } from "@/classes/Logger";
import { benchmarkServerHashCost } from "@/util/general/Hashing";
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

function getHashCost() {
	const userDefinedHashCost = parseInt(process.env.HASH_COST);
	if(userDefinedHashCost) { return userDefinedHashCost; }

	const userDefinedAcceptableHashingDelay = parseInt(process.env.ACCEPTABLE_HASHING_DELAY);
	if(userDefinedAcceptableHashingDelay) { return benchmarkServerHashCost(userDefinedAcceptableHashingDelay); }

	return benchmarkServerHashCost(350);
}

export default {
	PORT: parseInt(process.env.PORT) || 8443,
	CREDENTIALS: getCredentials(),
	JWT_SECRET: randomBytes(48).toString("hex"),
	HASH_COST: getHashCost(),
	ACCEPTABLE_HASHING_DELAY: parseInt(process.env.ACCEPTABLE_HASHING_DELAY) || 350
};