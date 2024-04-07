import { registerTransforms } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import "./registerFilter.js"
import "./registerFormat.js"
import {transforms} from "./constant.js";

registerTransforms(StyleDictionary);

StyleDictionary.registerTransformGroup({
  name: 'fluent/ui',
  // add a default name transform, since this is almost always needed
  // it's easy to override by users, adding their own "transforms"
  transforms: [...transforms, 'name/camel'],
});