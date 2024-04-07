import { registerTransforms } from "@tokens-studio/sd-transforms";

import lodash from "lodash";

const {once} = lodash;

const registerTransformsOnce = once(registerTransforms);

function normalizeFileExtension(extensionName) {
    if (!extensionName) return "";
    extensionName = extensionName.trim().toLowerCase();
    if (extensionName.startsWith(".")) extensionName = extensionName.slice(1);
    extensionName = extensionName.trim();
    return extensionName;
}

export { normalizeFileExtension, registerTransformsOnce };
