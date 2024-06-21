import * as fs from "fs";
import { Project } from './models';

export function remapBlank(s?: string) {
  return s === "blank" ? "none" : s;
}

export function GenerateSettingsCss(project: Project) {
  let settings = `
.chapter { page: chapter; }
@page:blank {
	@top-left { content: none; }
	@top-center { content: none; }
	@top-right { content: none; }
	@bottom-left { content: none; }
	@bottom-center { content: none; }
	@bottom-right { content: none; }
}
@page {
	marks:`;
  if (!project.CropMarks && !project.CrossMarks) settings += " none";
  if (project.CropMarks) settings += " crop";
  if (project.CrossMarks) settings += " cross";
  settings += `;
	size: ${project.PaperSize} ${project.Orientation};
	margin-top: ${project.Margins.Top};
	margin-bottom: ${project.Margins.Bottom};
}
@page:left {
	margin-left: ${project.Margins.Outer};
	margin-right: ${project.Margins.Inner};`;
  if (project.LeftPage.Header.Left !== "none") settings += `\n\t@top-left { content: ${remapBlank(project.LeftPage.Header.Left)}; }`;
  if (project.LeftPage.Header.Centre !== "none") settings += `\n\t@top-center { content: ${remapBlank(project.LeftPage.Header.Centre)}; }`;
  if (project.LeftPage.Header.Right !== "none") settings += `\n\t@top-right { content: ${remapBlank(project.LeftPage.Header.Right)}; }`;
  if (project.LeftPage.Footer.Left !== "none") settings += `\n\t@bottom-left { content: ${remapBlank(project.LeftPage.Footer.Left)}; }`;
  if (project.LeftPage.Footer.Centre !== "none") settings += `\n\t@bottom-center { content: ${remapBlank(project.LeftPage.Footer.Centre)}; }`;
  if (project.LeftPage.Footer.Right !== "none") settings += `\n\t@bottom-right { content: ${remapBlank(project.LeftPage.Footer.Right)}; }`;
  settings += `
}
@page:right {
	margin-left: ${project.Margins.Inner};
	margin-right: ${project.Margins.Outer};`;
  if (project.RightPage.Header.Left !== "none") settings += `\n\t@top-left { content: ${remapBlank(project.RightPage.Header.Right)}; }`;
  if (project.RightPage.Header.Centre !== "none") settings += `\n\t@top-center { content: ${remapBlank(project.RightPage.Header.Centre)}; }`;
  if (project.RightPage.Header.Right !== "none") settings += `\n\t@top-right { content: ${remapBlank(project.RightPage.Header.Left)}; }`;
  if (project.RightPage.Footer.Left !== "none") settings += `\n\t@bottom-right { content: ${remapBlank(project.RightPage.Footer.Left)}; }`;
  if (project.RightPage.Footer.Centre !== "none") settings += `\n\t@bottom-center { content: ${remapBlank(project.RightPage.Footer.Centre)}; }`;
  if (project.RightPage.Footer.Right !== "none") settings += `\n\t@bottom-right { content: ${remapBlank(project.RightPage.Footer.Right)}; }`;
  settings += `
}
@page chapter:first {
	margin-left: ${project.Margins.Inner};
	margin-right: ${project.Margins.Outer};`;
  if (project.FirstPage.Header.Left !== "none") settings += `\n\t@top-left { content: ${remapBlank(project.FirstPage.Header.Left)}; }`;
  if (project.FirstPage.Header.Centre !== "none") settings += `\n\t@top-center { content: ${remapBlank(project.FirstPage.Header.Left)}; }`;
  if (project.FirstPage.Header.Right !== "none") settings += `\n\t@top-right { content: ${remapBlank(project.FirstPage.Header.Right)}; }`;
  if (project.FirstPage.Footer.Left !== "none") settings += `\n\t@bottom-right { content: ${remapBlank(project.FirstPage.Footer.Left)}; }`;
  if (project.FirstPage.Footer.Centre !== "none") settings += `\n\t@bottom-center { content: ${remapBlank(project.FirstPage.Footer.Centre)}; }`;
  if (project.FirstPage.Footer.Right !== "none") settings += `\n\t@bottom-right { content: ${remapBlank(project.FirstPage.Footer.Right)}; }`;
  settings += `
}`;
  fs.writeFileSync("./settings.css", settings, { encoding: "utf-8" });
  project.Stylesheets.unshift("./settings.css")
}