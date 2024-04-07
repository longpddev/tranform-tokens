import StyleDictionary from "style-dictionary";

import { themesAvailable } from "./constant.mjs";

import { getTokenMode, fluentTokensName, formatOptions } from "./helper.mjs";

StyleDictionary.registerFormat({
    name: "fluent/ts/format",
    formatter: function({dictionary, platform}) {
        const globalTokens = [];
        const themesTokens = new Map;
        themesAvailable.forEach((theme => themesTokens.set(theme, [])));
        dictionary.allTokens.forEach((item => {
            const tokenMode = getTokenMode(item)?.toLowerCase();
            if (!tokenMode || !themesAvailable.has(tokenMode)) {
                globalTokens.push({
                    ...item,
                    name: fluentTokensName(item, platform)
                });
                return;
            }
            const tokens = themesTokens.get(tokenMode);
            tokens.push({
                ...item,
                name: fluentTokensName(item, platform)
            });
        }));
        const themesTokensCustomCollection = Array.from(themesTokens.entries()).map((([name, tokens]) => [ `${name}Tokens`, tokens ]));
        let result = `import { teamsLightTheme } from '@fluentui/react-theme';\n\n`;
        result += `export const globalTokens = Object.assign(${JSON.stringify(Object.fromEntries(globalTokens.map(formatOptions)), undefined, 2)}, teamsLightTheme)\n\n`;
        result += themesTokensCustomCollection.map((([name, tokens]) => `export const ${name} = Object.assign(${JSON.stringify(Object.fromEntries(tokens.map(formatOptions)), undefined, 2)}, globalTokens);`)).join("\n\n");
        return result;
    }
});
