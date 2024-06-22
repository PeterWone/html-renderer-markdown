import * as fs from 'fs';
import * as yaml from "yaml";
import { merge } from "lodash";

export async function mergeContributionConfig(namedConfigs: any, contributionFilename: string) {
  let contributionConfigurationFilename = contributionFilename.replace(/\.md/i, ".yaml");
  if (fs.existsSync(contributionConfigurationFilename)) {
    const raw = fs.readFileSync(contributionConfigurationFilename, { encoding: "utf-8" });
    const contributionNamedConfigs = yaml.parse(raw);
    merge(namedConfigs, contributionNamedConfigs);
  }
}
