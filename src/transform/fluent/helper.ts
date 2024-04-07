import {TransformedToken} from "style-dictionary/types";
import {replaceNameByCase, variableNameMatcher} from "./constant.js";
import lodash from "lodash";
import fluentTheme from '@fluentui/react-theme';
const { webLightTheme } = fluentTheme;
const { once} = lodash;

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function camelCase (str: string) {
  let [first, ...last] = str.trim().replace(/-+/, " ").replace(/\s+/, ' ').split(' ');
  first = first.toLowerCase();
  if(last.length > 0) {
    last = last.map(capitalize)

    return first + last.join('')
  }

  return first
}

export function formatOptions (token: TransformedToken) {
  return [token.name, token.value]
}

const logOnce = once((...args) => console.log(...args))

export function getTokenMode(token: TransformedToken): string | undefined {
  return token.original?.extensions?.['org.lukasoppermann.figmaDesignTokens']?.mode;
}

export function fluentTokensName (token: TransformedToken, options: {prefix?: string}) {
  const path = Array.from(token.path)
  let [collection] = extractCollectionToken(token)

  const lastPath = path[path.length - 1];
  if(lastPath.toLowerCase() === 'rest') path.pop();
  variableNameMatcher.forEach(({exp, to}) => {
    if(exp.test(collection)) {
      collection = collection.replace(exp, to)
    }
  })
  
  let result = camelCase([options.prefix].concat([collection], path).join(' '));

  for(const replaceCase of replaceNameByCase) {
    const newName = replaceWithStartBy(result, replaceCase.startBy, replaceCase.changeBy);

    if(newName !== result) {
      result = newName
      break;
    }
  }
  return result;
}

export function extractCollectionToken (token: TransformedToken) {
  return (token.parent ?? "").toLowerCase().split('/') as string[]
}

export function replaceWithStartBy(origin: string, startWith: string, replaceWith: string) {
  if(origin.length < startWith.length) return origin;
  if(!origin.startsWith(startWith)) return origin;
  return replaceWith + origin.slice(startWith.length)
}

export function includeVariableName(nameCheck: string, value?: string | number) {
  const isExist = nameCheck in webLightTheme;
  let isInclude = isExist
  if(isExist && value !== undefined) {
    // console.log(`${nameCheck} updated: ${webLightTheme[nameCheck]} => ${value}`)
    isInclude = webLightTheme[nameCheck] !== value
  }

  if(!isExist) {
    console.log(`${nameCheck} not exist in theme`)
  }
  return isInclude
}