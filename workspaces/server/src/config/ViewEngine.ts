import express, { Express } from "express";
import { join } from "path";
import { renderFile } from "pug";

export function setupViewEngine(app: Express) {
	const cwd = process.cwd();

	const htdocsPath = join(cwd, "/htdocs");
	const assetsPath = join(htdocsPath, "/assets");
	const faviconPath = join(htdocsPath, "/favicon.ico");

	app.use("/assets", express.static(assetsPath));
	app.use("/favicon.ico", express.static(faviconPath));

	app.engine("html", renderFile);
	app.set("view engine", "html");
	app.set("views", htdocsPath);

	app
		.get(["/", "/files", "/settings", "/login"], (request, response) => {
			return response.render("index.html");
		})
		.get("*", (request, response) => { // Fallback 404 route, redirect users to SPA
			return response.redirect("/");
		});
}