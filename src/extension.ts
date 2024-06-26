import { Metadata } from './metadata';
import * as vscode from 'vscode';
import * as htmlRendererMarkdown from "./html-renderer-markdown";
import { Logger } from "winston";

export async function activate(context: vscode.ExtensionContext) {
  const logger = await vscode.commands.executeCommand<Logger>(
    "print.registerDocumentRenderer", "markdown",
    {
      getBodyHtml: htmlRendererMarkdown.getBodyHtml,
      getCssUriStrings: htmlRendererMarkdown.getCssUriStrings,
      getScriptUriStrings: htmlRendererMarkdown.getScriptUriStrings,
      getResource: htmlRendererMarkdown.getResource
    }
  );
  // todo remove or update this log info
  logger.info("The new Markdown renderer is registered for printing services.");
  // capture the Print logger for use elsewhere
  Metadata.Logger = logger;
  Metadata.ExtensionContext = context;
  // code that imports the Metadata class can access its static properties
}

