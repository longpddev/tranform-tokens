import {PlatformConfig} from "style-dictionary/types";
import {BuildOptions} from "../interfaces.js"
import "./fluent/index.js"

export function  getAllPlatforms (options: BuildOptions) :Record<string, PlatformConfig> {
  let file;

  switch(options.fileExtension) {
    case 'js':
    case 'ts': {
      file = {
        destination: `tokens.${options.fileExtension}`,
        format: 'fluent/ts/format',
        filter: 'isAliasCollection'
      }
      break;
    }
    default: throw new Error(`fileExtension: ${options.fileExtension} not support`)
  }
  return {
    fluent: {
      transformGroup: 'fluent/ui',
      buildPath: options.buildPath,
      files: [
        file,
      ],
    },
  }
}