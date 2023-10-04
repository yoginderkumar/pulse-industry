import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { COLORS, BREAKPOINTS, SPACING } from "./theme";

const paddingProperties = defineProperties({
  conditions: BREAKPOINTS,
  defaultCondition: "xs",
  properties: {
    paddingTop: SPACING,
    paddingBottom: SPACING,
    paddingLeft: SPACING,
    paddingRight: SPACING,
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
  },
});

const marginProperties = defineProperties({
  conditions: BREAKPOINTS,
  defaultCondition: "xs",
  properties: {
    marginTop: SPACING,
    marginBottom: SPACING,
    marginLeft: SPACING,
    marginRight: SPACING,
  },
  shorthands: {
    margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
  },
});

export const marginPaddingStyles = createSprinkles(
  paddingProperties,
  marginProperties
);

export type TMarginPaddingStyles = Parameters<typeof marginPaddingStyles>[0];

const shadowProperties = defineProperties({
  properties: {
    shadowLevel: {
      s1: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, .06)",
      },
      s2: {
        boxShadow: "0px 4px 10px rgba(0, 0, 0, .06)",
      },
      s3: {
        boxShadow: "0px -2px 4px rgba(0, 0, 0, .06)",
      },
    },
  },
});

export const shadowStyles = createSprinkles(shadowProperties);
export type TShadowStyles = Parameters<typeof shadowStyles>[0];

const outlineProperties = defineProperties({
  properties: {
    outline: {
      none: {
        outline: 0,
      },
    },
  },
});

export const outlineStyles = createSprinkles(outlineProperties);
export type TOutlineStyles = Parameters<typeof outlineStyles>[0];

const borderColorProperties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: "&:hover" },
    focus: { selector: "&:focus" },
  },
  defaultCondition: "default",
  properties: {
    color: COLORS,
  },
});

export const borderColorStyles = createSprinkles(borderColorProperties);
export type TBorderColorStyles = Parameters<typeof borderColorStyles>[0];

const inputColorProperties = defineProperties({
  conditions: {
    default: {},
    placeholder: { selector: "&::placeholder" },
    focus: { selector: "&:focus" },
  },
  defaultCondition: "default",
  properties: {
    color: COLORS,
  },
});

export const inputColorStyles = createSprinkles(inputColorProperties);
export type TInputColorStyles = Parameters<typeof inputColorStyles>[0];
