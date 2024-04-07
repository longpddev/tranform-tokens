import StyleDictionary from "style-dictionary";
import "./registerFilter.js"
import "./registerFormat.js"
import {registerTransformsOnce} from "../../helper.js";
import {transforms} from "@tokens-studio/sd-transforms";

registerTransformsOnce(StyleDictionary);

StyleDictionary.registerTransformGroup({
  name: 'fluent/ui',
  // add a default name transform, since this is almost always needed
  // it's easy to override by users, adding their own "transforms"
  transforms: [...transforms, 'name/camel'],
});