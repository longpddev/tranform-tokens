import StyleDictionary from "style-dictionary";

import path from "path";

import "./setup.mjs";

const mapPlatform = {
    carbon: "carbon/ui",
    fluent: "fluent/ui"
};

const Test = StyleDictionary;

function buildAllPlatform(options) {
    const sourcePath = path.join(options.rootFolder, "/**/*.json").replace(/\\/g, "/");
    console.log("🚀 ~ buildAllPlatform ~ sourcePath:", sourcePath);
    const sd = new Test({
        log: {
            warnings: "error",
            verbosity: "verbose"
        },
        source: [ sourcePath ],
        platforms: {
            css: {
                transformGroup: mapPlatform[options.platform],
                buildPath: options.buildPath,
                files: [ {
                    destination: "tokens.js",
                    format: "fluent/ts/format",
                    filter: "isAliasCollection"
                } ]
            }
        }
    });
    sd.buildAllPlatforms();
}

export { buildAllPlatform };
