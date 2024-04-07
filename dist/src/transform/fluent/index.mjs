import StyleDictionary from "style-dictionary";

import "./registerFilter.mjs";

import "./registerFormat.mjs";

import { registerTransformsOnce } from "../../helper.mjs";

import { transforms } from "@tokens-studio/sd-transforms";

registerTransformsOnce(StyleDictionary);

StyleDictionary.registerTransformGroup({
    name: "fluent/ui",
    transforms: [ ...transforms, "name/camel" ]
});
