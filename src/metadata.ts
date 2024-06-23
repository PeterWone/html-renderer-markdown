import * as vscode from "vscode";
import { Logger } from "winston";

export class Metadata {
	static ExtensionPath: string = vscode.extensions.getExtension("pdconsec.md2")!.extensionPath;
	static ExtensionContext: vscode.ExtensionContext;
	static Logger: Logger;
}
