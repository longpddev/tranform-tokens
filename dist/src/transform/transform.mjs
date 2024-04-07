import StyleDictionary from "style-dictionary";

import path from "path";

import { getAllPlatforms } from "./setup.mjs";

function buildAllPlatform(options) {
    const sourcePath = path.join(options.rootFolder, "/**/*.json").replace(/\\/g, "/");
    console.log("🚀 ~ buildAllPlatform ~ sourcePath:", sourcePath);
    const sd = new StyleDictionary({
        log: {
            warnings: "error",
            verbosity: "verbose"
        },
        source: [ sourcePath ],
        platforms: {
            [options.platform]: getAllPlatforms(options)[options.platform]
        }
    });
    sd.buildAllPlatforms();
}

export { buildAllPlatform };
