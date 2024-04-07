import StyleDictionary from "style-dictionary";

import { extractCollectionToken } from "./helper.mjs";

StyleDictionary.registerFilter({
    name: "isGlobalCollection",
    matcher: function(token) {
        const [collection] = extractCollectionToken(token);
        return collection.toLowerCase().startsWith("global");
    }
});

StyleDictionary.registerFilter({
    name: "isAliasCollection",
    matcher: token => {
        const [collection] = extractCollectionToken(token);
        return !collection.toLowerCase().startsWith("global");
    }
});
