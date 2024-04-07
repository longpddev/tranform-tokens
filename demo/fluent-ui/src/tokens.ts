import { webLightTheme } from '@fluentui/react-theme';

export const globalTokens = { ...webLightTheme, ...{
  "borderRadiusNone": "0rem",
  "borderRadiusSmall": "0.125rem",
  "borderRadiusMedium": "0.25rem",
  "borderRadiusLarge": "0.375rem",
  "borderRadiusXLarge": "0.5rem",
  "borderRadiusCircular": "6.188rem",
  "spacingVerticalNone": "0rem",
  "spacingVerticalXXS": "0.125rem",
  "spacingVerticalXS": "0.25rem",
  "spacingVerticalSNudge": "0.375rem",
  "spacingVerticalS": "0.5rem",
  "spacingVerticalMNudge": "0.625rem",
  "spacingVerticalM": "0.75rem",
  "spacingVerticalL": "1rem",
  "spacingVerticalXL": "1.25rem",
  "spacingVerticalXXL": "1.5rem",
  "spacingVerticalXXXL": "2rem",
  "spacingHorizontalNone": "0rem",
  "spacingHorizontalXXS": "0.125rem",
  "spacingHorizontalXS": "0.25rem",
  "spacingHorizontalSNudge": "0.375rem",
  "spacingHorizontalS": "0.5rem",
  "spacingHorizontalMNudge": "0.625rem",
  "spacingHorizontalM": "0.75rem",
  "spacingHorizontalL": "1rem",
  "spacingHorizontalXL": "1.25rem",
  "spacingHorizontalXXL": "1.5rem",
  "spacingHorizontalXXXL": "2rem",
  "strokeWidthThin": "0rem",
  "strokeWidthThick": "0.125rem",
  "strokeWidthThicker": "0.188rem",
  "strokeWidthThickest": "0.25rem"
},}

export const lightTokens = {...globalTokens, ...{
  "colorNeutralBackgroundInvertedDisabled": "#f0f0f0",
  "colorNeutralBackgroundAlpha": "#ffffff80",
  "colorNeutralBackgroundAlpha2": "#ffffffcc",
  "colorNeutralForeground2BrandHover": "#27bd0f",
  "colorNeutralForeground2BrandSelected": "#27bd0f",
  "colorNeutralForeground3BrandHover": "#27bd0f",
  "colorNeutralForeground3BrandSelected": "#27bd0f",
  "colorNeutralForegroundInvertedDisabled": "#ffffff66",
  "colorNeutralStrokeAlpha": "#0000000d",
  "colorNeutralStrokeAlpha2": "#ffffff33",
  "colorNeutralStrokeAccessibleSelected": "#27bd0f",
  "colorNeutralStrokeInvertedDisabled": "#ffffff66",
  "colorBrandBackground": "#27bd0f",
  "colorBrandBackgroundStatic": "#27bd0f",
  "colorCompoundBrandBackground": "#27bd0f",
  "colorBrandForeground1": "#27bd0f",
  "colorBrandForegroundOnLight": "#27bd0f",
  "colorCompoundBrandForeground1": "#27bd0f",
  "colorBrandStroke1": "#27bd0f",
  "colorBrandStroke2Pressed": "#27bd0f",
  "colorCompoundBrandStroke": "#27bd0f",
  "colorStatusDangerForeground3": "#d13438",
  "colorStatusSuccessForegroundInverted": "#359b35"
}};

export const darkTokens = {...globalTokens, ...{}};