import StyleDictionary from "style-dictionary"

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