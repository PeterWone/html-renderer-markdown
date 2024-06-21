import fs from 'fs';
import yaml from "yaml";
import { default as merge } from "lodash.merge";

export async function mergeContributionConfig(namedConfigs: any, contributionFilename: string) {
  let contributionConfigurationFilename = contributionFilename.replace(/\.md/i, ".yaml");
  if (fs.existsSync(contributionConfigurationFilename)) {
    const raw = fs.readFileSync(contributionConfigurationFilename, { encoding: "utf-8" });
    const contributionNamedConfigs = yaml.parse(raw);
    merge(namedConfigs, contributionNamedConfigs);
  }
}
