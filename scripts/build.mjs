import * as loader from "./loader.mjs";
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from "fs";
import { $ as _ } from "execa";

(async () => {
	if(!loader.SKIP_CREDENTIALS && !existsSync(loader.SERVER_CREDENTIALS_DIR)) {
		console.log("SSL credentials not found in server folder. Please provide SSL credentials before proceeding.");
		process.exit(1);
	}

	if(!loader.SKIP_ENV_FILE && !existsSync(loader.SERVER_ENV_FILE)) {
		console.log(".env file not found in server folder. Please provide .env file before proceeding.");
		process.exit(1);
	}

	try {
		const $ = _({ stdio: "inherit" });

		console.log("Building client and server.");
		await $`yarn workspaces foreach -Rpt --from {client,server} run build`;

		console.log("Packaging build.");
		if(existsSync(loader.BUILD_ROOT_DIR)) { rmSync(loader.BUILD_ROOT_DIR, { recursive: true }); }

		cpSync(loader.SERVER_DIST_DIR, loader.BUILD_ROOT_DIR, { recursive: true });

		if(!loader.SKIP_CREDENTIALS) { 
			cpSync(loader.SERVER_CREDENTIALS_DIR, loader.BUILD_CREDENTIALS_DIR, { recursive: true }); 
		} else { console.log("Skipping SSL credentials."); }

		if(!loader.SKIP_ENV_FILE) {	cpSync(loader.SERVER_ENV_FILE, loader.BUILD_ENV_FILE); } 
		else { console.log("Skipping .env file."); }

		cpSync(loader.CLIENT_DIST_DIR, loader.BUILD_HTDOCS_DIR, { recursive: true });


		console.log("Installing build dependencies.");
		writeFileSync(loader.BUILD_YARNLOCK_FILE, "", { encoding: "utf-8" });
		await $`yarn --cwd ${loader.BUILD_ROOT_DIR} config set nodeLinker node-modules`;

		const buildDependencies = JSON.parse(readFileSync(loader.SERVER_PACKAGE_FILE, { encoding: "utf-8" })).dependencies;
		writeFileSync(loader.BUILD_PACKAGE_FILE, JSON.stringify({ dependencies: buildDependencies }));

		await $`yarn --cwd ${loader.BUILD_ROOT_DIR} install`;
	} catch(error) {
		console.log(error);
		process.exit(1);
	}
})();