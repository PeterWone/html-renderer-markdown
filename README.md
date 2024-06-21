# Markdown render 2

The Print extension historically uses the built-in rendering pipeline VS Code uses for the Markdown preview pane. The rationale was support for all the Mardown extensions that support the built-in renderer. Unfortunately Microsoft changes the built-in rendering without notice or regard for third party requirements.

Therefore we are preparing to use our own, independent rendering pipeline. This is an experimental release.

Print supports third party rendering plugins. You can even _replace_ an existing renderer, and that's how this preview works. When you install this extension it replaces Print's Markdown renderer. If you have problems with it, you can disable or remove this extension to go back to the old renderer. 

You may need to restart extensions.

## Features

- uses Marked rather than MarkdownIT because it's a lot easier to extend
- we've baked in support for the following
  - Katex (LaTeX)
  - SMILES and MHCHEM
  - DOT (Vis.js)
  - YUML diagrams

Mermaid is not server-side rendering friendly but DOT and YUML covers much of the same ground. We're also looking at PlantUML.
