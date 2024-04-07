export const variableNameMatcher = [{
  exp: /^(corner)/i,
  to: 'border'
}];

export const themesAvailable = new Set(['light', 'dark']);


export const replaceNameByCase = [
  {
    startBy: "colorBrandBackground1",
    changeBy: "colorBrandBackground"
  },
  {
    startBy: "colorNeutralForegroundInverted1",
    changeBy: "colorNeutralForegroundInverted"
  },
  {
    startBy: "colorNeutralBackgroundAlpha1",
    changeBy: "colorNeutralBackgroundAlpha"
  },
  {
    startBy: "colorNeutralStrokeOnBrand1",
    changeBy: "colorNeutralStrokeOnBrand"
  },
  {
    startBy: "colorNeutralStrokeDisabledInverted",
    changeBy: "colorNeutralStrokeInvertedDisabled"
  },
  {
    startBy: "colorBrandStrokeCompound",
    changeBy: "colorCompoundBrandStroke"
  },
  {
    startBy: "colorBrandBackgroundCompound",
    changeBy: "colorCompoundBrandBackground"
  },
  {
    startBy: "colorBrandForegroundCompound",
    changeBy: "colorCompoundBrandForeground1"
  },
  {
    startBy: "colorNeutralStrokeAlpha1",
    changeBy: 'colorNeutralStrokeAlpha'
  }
]
