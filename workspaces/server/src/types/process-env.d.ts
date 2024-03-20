export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			[key: string]: string | undefined;
			PORT: string;
			HASH_COST: string;
			ACCEPTABLE_HASHING_DELAY: string;
		}
	}
}