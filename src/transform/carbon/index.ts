import StyleDictionary from "style-dictionary";
import {registerTransformsOnce} from "../../helper.js";
import {transforms} from "@tokens-studio/sd-transforms";
import {getCarbonTokenName} from "./helper.js";
import {getReferences, usesReferences} from "style-dictionary/utils";
registerTransformsOnce(StyleDictionary);
const { fileHeader } = StyleDictionary.formatHelpers;

StyleDictionary.registerFilter({
  name: 'isCarbonTokens', 
  matcher: function (token) {
    return getCarbonTokenName(token).startsWith('$')
  }
})

StyleDictionary.registerTransform({
  name:'carbon/name',
  type: 'name',
  transformer: function (token) {
    return getCarbonTokenName(token).slice(1)
  }
})

StyleDictionary.registerFormat({
  name: 'carbon/scss',
  formatter: function ({dictionary, options, file, platform}) {
    const tokens: Array<{value: string, name: string}> = []
    dictionary.allTokens.map(token => {
      let value = token.value
      
      if (usesReferences(token.original.value)) {
        const refs = getReferences(token.original.value, dictionary.tokens);
        refs.forEach(ref => {
          value = value.replace(ref.value, function() {
            return `${ref.name}`;
          });
        });
      }

      tokens.push({value, name: token.name})
    });

    const tabEnter = '\n    '

    return `$tokens: (${tabEnter}${tokens.map(item => `${item.name}: ${item.value},`).join(tabEnter)}\n)`
  }
})

console.log(StyleDictionary.transformGroup)

StyleDictionary.registerTransformGroup({
  name: 'carbon/ui',
  transforms: [...transforms, 'carbon/name']
})