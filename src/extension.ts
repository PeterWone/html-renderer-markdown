import { Metadata } from './metadata';
import * as vscode from 'vscode';
import { Logger } from "winston";

export async function activate(context: vscode.ExtensionContext) {
  Metadata.ExtensionContext = context;
  // importing the markdown renderer needs the extension path
  // which isn't available before activate is called
  // so we use import as a function to defer it
  const htmlRendererMarkdown = await import("./html-renderer-markdown");
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
  // code that imports the Metadata class can access its static properties
}

