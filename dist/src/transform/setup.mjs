import "./fluent/index.mjs";

import "./carbon/index.mjs";

function getAllPlatforms(options) {
    let file;
    switch (options.fileExtension) {
      case "js":
      case "ts":
        {
            file = {
                destination: `tokens.${options.fileExtension}`,
                format: "fluent/ts/format",
                filter: "isAliasCollection"
            };
            break;
        }

      default:
        throw new Error(`fileExtension: ${options.fileExtension} not support`);
    }
    return {
        fluent: {
            transformGroup: "fluent/ui",
            buildPath: options.buildPath,
            files: [ file ]
        },
        carbon: {
            transformGroup: "carbon/ui",
            buildPath: options.buildPath,
            files: [ {
                destination: "variables.scss",
                format: "carbon/scss",
                filter: "isCarbonTokens"
            } ]
        }
    };
}

export { getAllPlatforms };
