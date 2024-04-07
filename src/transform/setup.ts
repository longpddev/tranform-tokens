import {PlatformConfig} from "style-dictionary/types";
import {BuildOptions} from "../interfaces.js"
import "./fluent/index.js"
import "./carbon/index.js"

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
      // transformGroup: 'tokens-studio',
      buildPath: options.buildPath,
      // transforms: ['name/kebab'],
      
      files: [
        file,
        // {
        //   destination: 'variables.css',
        //   format: 'css/variables',
        // },
      ],
    },
    carbon: {
      transformGroup: 'carbon/ui',
      buildPath: options.buildPath,
      files: [
        {
          destination: 'variables.scss',
          format: 'carbon/scss',
          filter: 'isCarbonTokens'
        },
      ]
    }
  }
}