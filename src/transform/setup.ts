import { registerTransforms } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import camelCase from 'lodash/camelCase.js'
import {TransformedToken} from "style-dictionary/types";

registerTransforms(StyleDictionary);

const transforms = [
  'ts/descriptionToComment',
  'ts/size/px',
  'ts/opacity',
  'ts/size/lineheight',
  'ts/typography/fontWeight',
  'ts/resolveMath',
  'ts/size/css/letterspacing',
  'ts/typography/css/fontFamily',
  'ts/typography/css/shorthand',
  'ts/border/css/shorthand',
  'ts/shadow/css/shorthand',
  'ts/color/css/hexrgba',
  'ts/color/modifiers',
];

/**
 * 
 * @param {TransformedToken} token
 */
function formatOptions (token: TransformedToken) {
  return [token.name, token.value]
}

StyleDictionary.registerFilter({
  name: 'isGlobalCollection', 
  matcher: function (token) {
    const [collection] = token.path
    return collection.toLowerCase().startsWith('global')
  }
})

StyleDictionary.registerFilter({
	name: "isAliasCollection",
	matcher: token =>
	{
		const [collection] = token.path
		return !collection.toLowerCase().startsWith('global')
	},
})

const variableNameMatcher = [{
  exp: /^(corner)/i,
  to: 'border'
}];

function fluentTokensName (token: TransformedToken, options: {prefix?: string}) {
  let [collection] = token.path;
  const path = Array.from(token.path)
  // remove collection name mode
  path.splice(1, 1)
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

const themesAvailable = new Set(['light', 'dark'])

StyleDictionary.registerFormat({
  name: 'fluent/ts/format',
  formatter: function ({dictionary, platform}) {
    const globalTokens: Array<TransformedToken> = [];
    const themesTokens = /** @type {Map<string, Array<TransformedToken>>} */(new Map());
    themesAvailable.forEach(theme => themesTokens.set(theme, []));

    dictionary.allTokens.forEach(item => {
      const [, collectionMode] = item.path;
      
      if(!themesAvailable.has(collectionMode)) {
        globalTokens.push({...item, name: fluentTokensName(item, platform)});
        return;
      }

      const tokens = themesTokens.get(collectionMode);
      tokens.push({...item, name: fluentTokensName(item, platform)})
    });

    const themesTokensCustomCollection = Array.from(themesTokens.entries()).map(([name, tokens]) => ([`${name}Tokens`, tokens]))

    let result = `import { teamsLightTheme } from '@fluentui/react-theme';\n\n`

    result += `export const globalTokens = Object.assign(${JSON.stringify(Object.fromEntries(globalTokens.map(formatOptions)), undefined, 2)}, teamsLightTheme)\n\n`;

    result += themesTokensCustomCollection.map(([name, tokens]) => {
      return `export const ${name} = Object.assign(${JSON.stringify(Object.fromEntries(tokens.map(formatOptions)), undefined, 2)}, globalTokens);`
    }).join('\n\n')
    
    return result
  }
})

StyleDictionary.registerTransformGroup({
  name: 'fluent/ui',
  // add a default name transform, since this is almost always needed
  // it's easy to override by users, adding their own "transforms"
  transforms: [...transforms, 'name/camel'],
});