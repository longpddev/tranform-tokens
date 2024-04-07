import StyleDictionary from "style-dictionary";
import {TransformedToken} from "style-dictionary/types";
import {themesAvailable} from "./constant.js";
import {extractCollectionToken, fluentTokensName, formatOptions, getTokenMode, includeVariableName} from "./helper.js";

StyleDictionary.registerFormat({
  name: 'fluent/ts/format',
  formatter: function ({dictionary, platform}) {
    const globalTokens: Array<TransformedToken> = [];
    const themesTokens = /** @type {Map<string, Array<TransformedToken>>} */(new Map());
    themesAvailable.forEach(theme => themesTokens.set(theme, []));

    dictionary.allTokens.forEach(item => {
      const newTokenName = fluentTokensName(item, platform);
      if(!includeVariableName(newTokenName, item.value)) return;
      const [,tokenMode] = extractCollectionToken(item);

      if(!tokenMode || !themesAvailable.has(tokenMode)) {
        globalTokens.push({...item, name: newTokenName});
        return;
      }

      const tokens = themesTokens.get(tokenMode);
      tokens.push({...item, name: newTokenName})
    });

    const themesTokensCustomCollection = Array.from(themesTokens.entries()).map(([name, tokens]) => ([`${name}Tokens`, tokens]))

    let result = `import { webLightTheme } from '@fluentui/react-theme';\n\n`

    result += `export const globalTokens = { ...webLightTheme, ...${JSON.stringify(Object.fromEntries(globalTokens.map(formatOptions)), undefined, 2)},}\n\n`;

    result += themesTokensCustomCollection.map(([name, tokens]) => {
      return `export const ${name} = {...globalTokens, ...${JSON.stringify(Object.fromEntries(tokens.map(formatOptions)), undefined, 2)}};`
    }).join('\n\n')
    
    return result
  }
})