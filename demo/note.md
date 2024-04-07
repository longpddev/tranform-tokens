Xl => upper case //fix: check figma plugin
a lot figma variable not in react ui
all colorBrandBackground1 => colorBrandBackground
all colorNeutralForegroundInverted1 => colorNeutralForegroundInverted
colorNeutralBackgroundAlpha1 => colorNeutralBackgroundAlpha
colorNeutralStrokeAlpha1 => colorNeutralStrokeAlpha
colorNeutralStrokeOnBrand1 => colorNeutralStrokeOnBrand
colorNeutralStrokeDisabledInverted => colorNeutralStrokeInvertedDisabled

const mapReplace = [
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
]