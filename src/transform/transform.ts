import StyleDictionary from "style-dictionary";
import path from "path";
import {BuildOptions} from "../interfaces.js";
import {getAllPlatforms} from "./setup.js";

export function buildAllPlatform(options: BuildOptions) {
  const sourcePath = path.join(options.rootFolder, '/**/*.json').replace(/\\/g, '/')
  console.log("🚀 ~ buildAllPlatform ~ sourcePath:", sourcePath)
  const sd = new StyleDictionary({
    log: {
      warnings: 'error',
      verbosity: 'verbose'
    },
    source: [sourcePath],
    platforms: {
      [options.platform]: getAllPlatforms(options)[options.platform]
    },
  });
  sd.buildAllPlatforms();
}
