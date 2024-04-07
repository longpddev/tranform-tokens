const transforms = [ "ts/descriptionToComment", "ts/size/px", "ts/opacity", "ts/size/lineheight", "ts/typography/fontWeight", "ts/resolveMath", "ts/size/css/letterspacing", "ts/typography/css/fontFamily", "ts/typography/css/shorthand", "ts/border/css/shorthand", "ts/shadow/css/shorthand", "ts/color/css/hexrgba", "ts/color/modifiers" ];

const variableNameMatcher = [ {
    exp: /^(corner)/i,
    to: "border"
} ];

const themesAvailable = new Set([ "light", "dark" ]);

export { themesAvailable, transforms, variableNameMatcher };
