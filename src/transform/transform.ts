import StyleDictionary from "style-dictionary";
import path from "path";
import "./setup";
import {Config} from "style-dictionary/types";
import appRoot from 'app-root-path'
const mapPlatform = {
  carbon: "carbon/ui",
  fluent: "fluent/ui"
}

interface BuildOptions {
  rootFolder: string, 
  platform: 'carbon' | 'fluent',
  buildPath: string
}

interface Test {
  new (options: Config): StyleDictionary.Core
}

const Test = StyleDictionary as unknown as Test

export function buildAllPlatform(options: BuildOptions) {
  const sourcePath = path.join(options.rootFolder, '/**/*.json').replace(/\\/g, '/')
  console.log("🚀 ~ buildAllPlatform ~ sourcePath:", sourcePath)
  const sd = new Test({
    log: {
      warnings: 'error',
      verbosity: 'verbose'
    },
    source: [sourcePath],
    platforms: {
      css: {
        transformGroup: mapPlatform[options.platform],
        buildPath: options.buildPath,
        files: [
          {
            destination: 'tokens.js',
            format: 'fluent/ts/format',
            filter: 'isAliasCollection'
          },
        ],
      },
    },
  });
  sd.buildAllPlatforms();
}
