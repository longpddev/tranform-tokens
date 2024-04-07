import {TransformedToken} from "style-dictionary/types";
import {variableNameMatcher} from "./constant.js";
import lodash from "lodash";
const {camelCase, once} = lodash;

export function formatOptions (token: TransformedToken) {
  return [token.name, token.value]
}

const logOnce = once((...args) => console.log(...args))

export function getTokenMode(token: TransformedToken): string | undefined {
  return token.original?.extensions?.['org.lukasoppermann.figmaDesignTokens']?.mode;
}

export function fluentTokensName (token: TransformedToken, options: {prefix?: string}) {
  let [collection] = token.path;
  const path = Array.from(token.path)
  const tokenMode = getTokenMode(token);

  if(tokenMode && tokenMode.toLowerCase() === path[1].toLowerCase()) {
    // remove collection name mode
    path.splice(1, 1)
  }
  
  const lastPath = path[path.length - 1];
  if(lastPath.toLowerCase() === 'rest') path.pop();
  variableNameMatcher.forEach(({exp, to}) => {
    if(exp.test(collection)) {
      collection = collection.replace(exp, to)
    }
  })
  
  const result = camelCase([options.prefix].concat(path).join(' '));
  return result;
}
