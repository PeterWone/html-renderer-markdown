const fs = require('fs').promises;
const path = require('path');
const fontExtensions = ['.ttf', '.otf', ".woff", ".woff2", ".eot"];

async function getFilenames(folderPath, extensions) {
  try {
    // Read the contents of the folder asynchronously
    const files = await fs.readdir(folderPath);

    // Filter for font files (assuming .ttf and .otf extensions for this example)
    const fontFiles = files.filter(file => extensions.includes(path.extname(file).toLowerCase()));

    // Return the list of font files
    return fontFiles;
  } catch (err) {
    console.error('Error reading the folder:', err);
    throw err; // Rethrow the error to be handled by the caller
  }
}

(async () => {
  const folderPath = "node_modules/katex/dist/fonts";
  const outputPath = "src/resources.js";

  const fontFilenames = await getFilenames(folderPath, fontExtensions);
  const resourceLoaders = fontFilenames.map(fontfilename => `
resources.set("fonts/${fontfilename}", {
    content: require("../${folderPath}/${fontfilename}").default.toString(),
    mimeType: "font/${path.extname(fontfilename).substring(1)}"
});`);
  const completeLoaderCode = `//to change this code modify resource-loader-generator/app.js\n\nconst resources = new Map();\n\n${resourceLoaders.join('\n\n')}\n\nexport default resources;\n\n`;
  await fs.writeFile(outputPath, completeLoaderCode);
})();