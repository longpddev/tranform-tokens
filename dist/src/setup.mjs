import { registerTransforms } from "@tokens-studio/sd-transforms";

import StyleDictionary from "style-dictionary";

import camelCase from "lodash/camelCase.js";

registerTransforms(StyleDictionary);

const kebabTransform = StyleDictionary.transform["name/camel"];

const transforms = [ "ts/descriptionToComment", "ts/size/px", "ts/opacity", "ts/size/lineheight", "ts/typography/fontWeight", "ts/resolveMath", "ts/size/css/letterspacing", "ts/typography/css/fontFamily", "ts/typography/css/shorthand", "ts/border/css/shorthand", "ts/shadow/css/shorthand", "ts/color/css/hexrgba", "ts/color/modifiers" ];

function formatOptions(token) {
    return [ token.name, token.value ];
}

StyleDictionary.registerFilter({
    name: "isGlobalCollection",
    matcher: function(tokens) {
        const parentPath = tokens.parent;
        return parentPath.toLowerCase().startsWith("global");
    }
});

StyleDictionary.registerFilter({
    name: "isAliasCollection",
    matcher: token => {
        const parentPath = token.parent;
        return parentPath && !parentPath.toLowerCase().startsWith("global");
    }
});

const variableNameMatcher = [ {
    exp: /^(corner)/i,
    to: "border"
} ];

StyleDictionary.registerTransform({
    name: "fluent/name",
    type: "name",
    matcher: kebabTransform.matcher,
    transformer: function(token, options) {
        var _a;
        let [collection] = ((_a = token.parent) !== null && _a !== void 0 ? _a : "").split("/");
        const path = Array.from(token.path);
        const lastPath = path[path.length - 1];
        if (lastPath.toLowerCase() === "rest") path.pop();
        variableNameMatcher.forEach((({exp, to}) => {
            if (exp.test(collection)) {
                collection = collection.replace(exp, to);
            }
        }));
        const result = camelCase([ options.prefix ].concat([ collection ], path).join(" "));
        return result;
    }
});

const themesAvailable = new Set([ "light", "dark" ]);

StyleDictionary.registerFormat({
    name: "fluent/ts/format",
    formatter: function({dictionary}) {
        const globalTokens = [];
        const themesTokens = new Map;
        themesAvailable.forEach((theme => themesTokens.set(theme, [])));
        dictionary.allTokens.forEach((item => {
            var _a;
            const [, collectionMode] = ((_a = item.parent) !== null && _a !== void 0 ? _a : "").toLowerCase().split("/");
            if (!themesAvailable.has(collectionMode)) {
                globalTokens.push(item);
                return;
            }
            const tokens = themesTokens.get(collectionMode);
            tokens.push(item);
        }));
        const themesTokensCustomCollection = Array.from(themesTokens.entries()).map((([name, tokens]) => [ `${name}Tokens`, tokens ]));
        let result = `import { teamsLightTheme } from '@fluentui/react-theme';\n\n`;
        result += `export const globalTokens = Object.assign(teamsLightTheme, ${JSON.stringify(Object.fromEntries(globalTokens.map(formatOptions)), undefined, 2)})\n\n`;
        result += themesTokensCustomCollection.map((([name, tokens]) => `export const ${name} = Object.assign(globalTokens, ${JSON.stringify(Object.fromEntries(tokens.map(formatOptions)), undefined, 2)});`)).join("\n\n");
        return result;
    }
});

StyleDictionary.registerTransformGroup({
    name: "fluent/ui",
    transforms: [ ...transforms, "fluent/name" ]
});
