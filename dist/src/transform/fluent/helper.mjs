import { variableNameMatcher, replaceNameByCase } from "./constant.mjs";

import lodash from "lodash";

import fluentTheme from "@fluentui/react-theme";

const {webLightTheme} = fluentTheme;

const {once} = lodash;

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function camelCase(str) {
    let [first, ...last] = str.trim().replace(/-+/, " ").replace(/\s+/, " ").split(" ");
    first = first.toLowerCase();
    if (last.length > 0) {
        last = last.map(capitalize);
        return first + last.join("");
    }
    return first;
}

function formatOptions(token) {
    return [ token.name, token.value ];
}

once(((...args) => console.log(...args)));

function fluentTokensName(token, options) {
    const path = Array.from(token.path);
    let [collection] = extractCollectionToken(token);
    const lastPath = path[path.length - 1];
    if (lastPath.toLowerCase() === "rest") path.pop();
    variableNameMatcher.forEach((({exp, to}) => {
        if (exp.test(collection)) {
            collection = collection.replace(exp, to);
        }
    }));
    let result = camelCase([ options.prefix ].concat([ collection ], path).join(" "));
    for (const replaceCase of replaceNameByCase) {
        const newName = replaceWithStartBy(result, replaceCase.startBy, replaceCase.changeBy);
        if (newName !== result) {
            result = newName;
            break;
        }
    }
    return result;
}

function extractCollectionToken(token) {
    return (token.parent ?? "").toLowerCase().split("/");
}

function replaceWithStartBy(origin, startWith, replaceWith) {
    if (origin.length < startWith.length) return origin;
    if (!origin.startsWith(startWith)) return origin;
    return replaceWith + origin.slice(startWith.length);
}

function includeVariableName(nameCheck, value) {
    const isExist = nameCheck in webLightTheme;
    let isInclude = isExist;
    if (isExist && value !== undefined) {
        isInclude = webLightTheme[nameCheck] !== value;
    }
    if (!isExist) {
        console.log(`${nameCheck} not exist in theme`);
    }
    return isInclude;
}

export { extractCollectionToken, fluentTokensName, formatOptions, includeVariableName, replaceWithStartBy };
