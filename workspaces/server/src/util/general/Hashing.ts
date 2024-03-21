import { logger } from "@/classes/Logger";
import { hashSync } from "bcrypt";
import { yellow } from "chalk";

export function benchmarkServerHashCost(targetTime: number): number {
	logger.warning("Server's acceptable hash cost is being benchmarked.");

	let cost = 0, startTime, endTime, timeCost;
	do {
		cost++;

		startTime = new Date().getTime();
		hashSync("benchmark", cost);
		endTime = new Date().getTime();

		timeCost = endTime - startTime;
	} while(timeCost < targetTime);
	cost -= 1;

	logger.info(`Your server's benchmarked acceptable hash cost for a delay of ${targetTime}ms is ${yellow(cost)}.`);
	logger.info("To prevent this message from showing up again, add this to your .env file:");
	logger.info(`HASH_COST=${cost}`);
	console.log();

	return cost;
}