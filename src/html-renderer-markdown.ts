import { Metadata } from './metadata';
import * as vscode from 'vscode';
import * as fs from "fs";
import * as path from "path";
import { IResourceDescriptor } from "./IResourceDescriptor";
import { marked } from 'marked';
import { dom } from "./dom.js";
import * as Handlebars from "handlebars";
// import smartquotes from "smartquotes";
import { processFencedBlocks } from './processFencedBlocks.js';
import { GenerateSettingsCss } from './settings.js';

// RESOURCES 
const resources = new Map<string, IResourceDescriptor>();

// Resolve the content of a stylesheet.
// Then add it to resources with the CSS mimeType
// under the name that will be used to request it.
resources.set("default-markdown.css", {
	content: require("./default-markdown.css").default.toString(),
	mimeType: "text/css; charset=utf-8;"
});

resources.set("katex.min.css", {
  content: require("../node_modules/katex/dist/katex.css").default.toString(),
	mimeType: "text/css; charset=utf-8;"
});

// give the user the option to turn off rendered printing
export function isEnabled(): boolean {
	return vscode.workspace.getConfiguration("print").renderMarkdown;
}

// todo IMPLEMENT YOUR OWN TRANSFORMATION TO HTML
// This is the content of the body tag, not the whole page.
// While you can embed style this is hard to customise and you are
// better off linking a stylesheet resource.
export async function getBodyHtml(raw: string, languageId: string) {
  // const updatedTokens = await processFencedBlocks(project.Config, contributionFilename, resolvedTemplate)
}

// todo implement getTitle when the default is unsatisfactory
// export function getTitle(filepath: string): string {
// 	return "CUSTOM TITLE STRING";
// }

export function getCssUriStrings(): Array<string> {
	const cssUriStrings = [
    "bundled/default-markdown.css",
    "bundled/katex.min.css",
    "bundled/settings.css"
	];
	return cssUriStrings;
}

export function getResource(name: string): IResourceDescriptor {
	return resources.get(name)!;
}