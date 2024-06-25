import * as vscode from 'vscode';
import { IResourceDescriptor } from "./IResourceDescriptor";
import { processFencedBlocks } from './processFencedBlocks';
import { marked } from 'marked';
const resources = require("./resources.js").resources;

// RESOURCES 
//onst resources = new Map<string, IResourceDescriptor>();

// Resolve the content of a stylesheet.
// Then add it to resources with the CSS mimeType
// under the name that will be used to request it.
resources.set("default-markdown.css", {
  content: require("./default-markdown.css").default.toString(),
  mimeType: "text/css; charset=utf-8;"
});

resources.set("katex.css", {
  content: require("../node_modules/katex/dist/katex.css").default.toString(),
  mimeType: "text/css; charset=utf-8;"
});

// give the user the option to turn off rendered printing
export function isEnabled(): boolean {
  return vscode.workspace.getConfiguration("print").renderMarkdown;
}

export async function getBodyHtml(raw: string, languageId: string) {
  const updatedTokens = await processFencedBlocks({}, raw);
  return marked.parser(updatedTokens);
}

// todo implement getTitle when the default is unsatisfactory
// export function getTitle(filepath: string): string {
// 	return "CUSTOM TITLE STRING";
// }

export function getCssUriStrings(): Array<string> {
  const cssUriStrings = [
    "bundled/default-markdown.css",
    "bundled/katex.css",
    "bundled/settings.css"
  ];
  return cssUriStrings;
}

export function getResource(name: string): IResourceDescriptor {
  return resources.get(name)!;
}
