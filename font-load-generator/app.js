// Import the file system module with promises API
const fs = require('fs').promises;
const path = require('path');
const fontExtensions = ['.ttf', '.otf', ".woff", ".woff2", ".eot"];

// Async function to get the list of font files in the provided folder
async function getFontList(folderPath) {
  try {
    // Read the contents of the folder asynchronously
    const files = await fs.readdir(folderPath);

    // Filter for font files (assuming .ttf and .otf extensions for this example)
    const fontFiles = files.filter(file => fontExtensions.includes(path.extname(file).toLowerCase()));

    // Return the list of font files
    return fontFiles;
  } catch (err) {
    console.error('Error reading the folder:', err);
    throw err; // Rethrow the error to be handled by the caller
  }
}

// Example usage of GetFontList
(async () => {
  try {
    const folderPath = process.argv[2]; // Get the folder path from the command line arguments
    if (!folderPath) {
      console.log('Please provide a folder path as a command line argument.');
      process.exit(1);
    }

    const outputPath = process.argv[3]; // path to the file to generate

    const fontFilenames = await getFontList(folderPath);
    const resourceLoaders = fontFilenames.map(fontfilename => `
resources.set("fonts/${fontfilename}", {
    content: require("../${folderPath}/${fontfilename}").default.toString(),
    mimeType: "font/${path.extname(fontfilename).substring(1)}"
});`);
    const completeLoaderCode = `export const resources = new Map();\n\n${resourceLoaders.join('\n\n')}\n\n`;
    await fs.writeFile(outputPath, completeLoaderCode);
  } catch (error) {
    console.error('Failed to get font list:', error);
  }
})();