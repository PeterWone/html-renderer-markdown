import SmilesDrawer from 'smiles-drawer';

export async function getSmilesSvgAsync(smiles, options): Promise<string> {
  const svgDrawer = new SmilesDrawer.SvgDrawer(options);
  const parseTree = await new Promise((resolve, reject) => SmilesDrawer.parse(smiles, resolve, reject));
  const svgElement = svgDrawer.draw(parseTree, 'svg', 'light');
  return svgElement.outerHTML;
}
