import { variableNameMatcher } from "./constant.mjs";

import lodash from "lodash";

const {camelCase, once} = lodash;

function formatOptions(token) {
    return [ token.name, token.value ];
}

once(((...args) => console.log(...args)));

function getTokenMode(token) {
    return token.original?.extensions?.["org.lukasoppermann.figmaDesignTokens"]?.mode;
}

function fluentTokensName(token, options) {
    let [collection] = token.path;
    const path = Array.from(token.path);
    const tokenMode = getTokenMode(token);
    if (tokenMode && tokenMode.toLowerCase() === path[1].toLowerCase()) {
        path.splice(1, 1);
    }
    const lastPath = path[path.length - 1];
    if (lastPath.toLowerCase() === "rest") path.pop();
    variableNameMatcher.forEach((({exp, to}) => {
        if (exp.test(collection)) {
            collection = collection.replace(exp, to);
        }
    }));
    const result = camelCase([ options.prefix ].concat(path).join(" "));
    return result;
}

export { fluentTokensName, formatOptions, getTokenMode };
