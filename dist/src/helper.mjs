function normalizeFileExtension(extensionName) {
    if (!extensionName) return "";
    extensionName = extensionName.trim().toLowerCase();
    if (extensionName.startsWith(".")) extensionName = extensionName.slice(1);
    extensionName = extensionName.trim();
    return extensionName;
}

export { normalizeFileExtension };
