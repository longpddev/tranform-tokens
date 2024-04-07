import { registerTransforms } from "@tokens-studio/sd-transforms";

import StyleDictionary from "style-dictionary";

import "./registerFilter.mjs";

import "./registerFormat.mjs";

import { transforms } from "./constant.mjs";

registerTransforms(StyleDictionary);

StyleDictionary.registerTransformGroup({
    name: "fluent/ui",
    transforms: [ ...transforms, "name/camel" ]
});
