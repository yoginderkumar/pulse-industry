import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { BREAKPOINTS, COLORS, SIZES } from "./css/theme";

const colorProperties = defineProperties({
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

export const boxColorStyles = createSprinkles(colorProperties);

export type TBoxColorStyles = Parameters<typeof boxColorStyles>[0];

const backgroundColorProperties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: "&:hover" },
  },
  defaultCondition: "default",
  properties: {
    backgroundColor: COLORS,
  },
  shorthands: {
    bgColor: ["backgroundColor"],
  },
});

const textProperties = defineProperties({
  conditions: BREAKPOINTS,
  defaultCondition: "xs",
  properties: {
    textAlign: ["left", "center", "right"],
    textDecoration: {
      overline: "overline",
      lineThrough: "line-through",
      underline: "underline",
      none: "none",
    },
  },
});

const fontSizeProperties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: "&:hover" },
  },
  defaultCondition: "default",
  properties: {
    fontSize: {
      xs: { fontSize: "0.75rem", lineHeight: "1rem" },
      sm: { fontSize: "12px", lineHeight: "15px" },
      base: { fontSize: "14px", lineHeight: "17px" },
      md: { fontSize: "16px", lineHeight: "19px" },
      lg: { fontSize: "20px", lineHeight: "24px" },
      xl: { fontSize: "24px", lineHeight: "30px" },
      "2xl": { fontSize: "28px", lineHeight: "34px" },
      "3xl": { fontSize: "32px", lineHeight: "39px" },
    },
  },
});

const fontWeightProperties = defineProperties({
  properties: {
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
    },
  },
});

const displayProperties = defineProperties({
  conditions: BREAKPOINTS,
  defaultCondition: "xs",
  properties: {
    display: {
      block: "block",
      flex: "flex",
      inline: "inline",
      inlineBlock: "inline-block",
      grid: "grid",
      none: "none",
    },
  },
});

const flexProperties = defineProperties({
  conditions: BREAKPOINTS,
  defaultCondition: "xs",
  properties: {
    flexDirection: {
      col: "column",
      row: "row",
      colReverse: "column-reverse",
      rowReverse: "row-reverse",
    },
    alignItems: {
      center: "center",
      end: "flex-end",
      start: "flex-start",
      stretch: "stretch",
    },
    alignSelf: {
      center: "center",
      stretch: "stretch",
      start: "flex-start",
      end: "flex-end",
    },
    justifyContent: {
      center: "center",
      start: "flex-start",
      end: "flex-end",
      between: "space-between",
      evenly: "space-evenly",
    },
    flex: {
      "1": {
        flex: "1 1 0%",
      },
      auto: {
        flex: "1 1 auto",
      },
      initial: {
        flex: "0 1 auto",
      },
      none: {
        flex: "none",
      },
    },
    flexGrow: {
      "0": 0,
      "1": 1,
    },
    flexShrink: {
      "0": 0,
      "1": 1,
    },
    flexWrap: {
      wrap: "wrap",
      nowrap: "nowrap",
    },
  },
});

const visibleProperties = defineProperties({
  conditions: BREAKPOINTS,
  defaultCondition: "xs",
  properties: {
    visibility: {
      visible: "visible",
      none: "hidden",
    },
  },
});

const gapProperties = defineProperties({
  conditions: BREAKPOINTS,
  defaultCondition: "xs",
  properties: {
    gap: {
      px: "px",
      "0": "0",
      "1": ".25rem",
      "2": ".5rem",
      "3": ".75rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "7": "1.75rem",
      "8": "2rem",
      "10": "2.5rem",
      "12": "3rem",
      "14": "3.5rem",
      "16": "4rem",
    },
  },
});

const positionProperties = defineProperties({
  conditions: BREAKPOINTS,
  defaultCondition: "xs",
  properties: {
    position: ["absolute", "relative", "fixed", "sticky"],
    top: {
      "0": 0,
    },
    right: {
      "0": 0,
    },
    bottom: {
      "0": 0,
    },
    left: {
      "0": 0,
      full: "100%",
    },
  },
  shorthands: {
    inset: ["top", "right", "bottom", "left"],
    insetX: ["left", "right"],
    insetY: ["top", "bottom"],
  },
});

const cursorProperties = defineProperties({
  properties: {
    pointerEvents: ["none"],
    cursor: { pointer: "pointer", disabled: "not-allowed", default: "default" },
  },
});

const BORDER_WIDTH = {
  "0": 0,
  "1": "1px",
  "2": "2px",
  "4": "4px",
} as const;

const BORDER_RADIUS = {
  none: 0,
  sm: "0.125rem",
  md: "0.25rem",
  lg: "0.5rem",
  full: "999px",
} as const;

const borderProperties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: "&:hover" },
    focus: { selector: "&:focus" },
  },
  defaultCondition: "default",
  properties: {
    borderTopWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderLeftWidth: BORDER_WIDTH,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderColor: COLORS,
    borderStyle: ["solid", "dashed", "dotted", "double", "none"],
  },
  shorthands: {
    borderRadius: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomRightRadius",
      "borderBottomLeftRadius",
    ],
    borderTopRadius: ["borderTopLeftRadius", "borderTopRightRadius"],
    borderRightRadius: ["borderTopRightRadius", "borderBottomRightRadius"],
    borderBottomRadius: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    borderLeftRadius: ["borderBottomLeftRadius", "borderTopLeftRadius"],
    rounded: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomRightRadius",
      "borderBottomLeftRadius",
    ],
    roundedTop: ["borderTopLeftRadius", "borderTopRightRadius"],
    roundedRight: ["borderTopRightRadius", "borderBottomRightRadius"],
    roundedBottom: ["borderBottomLeftRadius", "borderBottomRightRadius"],
    roundedLeft: ["borderBottomLeftRadius", "borderTopLeftRadius"],
    roundedTopLeft: ["borderTopLeftRadius"],
    roundedTopRight: ["borderTopRightRadius"],
    roundedBottomRight: ["borderBottomRightRadius"],
    roundedBottomLeft: ["borderBottomLeftRadius"],
    borderWidth: [
      "borderTopWidth",
      "borderRightWidth",
      "borderBottomWidth",
      "borderLeftWidth",
    ],
    borderXWidth: ["borderLeftWidth", "borderRightWidth"],
    borderYWidth: ["borderTopWidth", "borderBottomWidth"],
  },
});

const zIndexProperties = defineProperties({
  properties: {
    zIndex: { "0": 0, "10": 10, "50": 50, "100": 100 },
  },
});

const minWidthProperties = defineProperties({
  properties: {
    minWidth: {
      "0": 0,
      full: "100%",
      min: "min-content",
      max: "max-content",
      screenMd: "760px",
    },
  },
});

const maxWidthProperties = defineProperties({
  conditions: BREAKPOINTS,
  defaultCondition: "xs",
  properties: {
    maxWidth: {
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      screen2xl: "1440px",
      full: "100%",
      fitContent: "fit-content",
      min: "min-content",
      max: "max-content",
    },
  },
});

const maxHeightProperties = defineProperties({
  conditions: BREAKPOINTS,
  defaultCondition: "xs",
  properties: {
    maxHeight: {
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      screen2xl: "1440px",
      min: "min-content",
      max: "max-content",
      ...SIZES,
    },
  },
});

const minHeightProperties = defineProperties({
  conditions: BREAKPOINTS,
  defaultCondition: "xs",
  properties: {
    minHeight: { ...SIZES, "0": 0, screen: "100vh", full: "100%" },
  },
});

const overflowProperties = defineProperties({
  properties: {
    overflowX: ["auto", "hidden", "visible", "scroll"],
    overflowY: ["auto", "hidden", "visible", "scroll"],
  },
  shorthands: {
    overflow: ["overflowX", "overflowY"],
  },
});

const opacityProperties = defineProperties({
  properties: {
    opacity: {
      "0": "0",
      "50": ".5",
      "70": ".7",
      "100": "1",
      "40": "0.4",
      "60": "0.6",
    },
  },
});

export const boxStyles = createSprinkles(
  backgroundColorProperties,
  textProperties,
  displayProperties,
  flexProperties,
  gapProperties,
  positionProperties,
  cursorProperties,
  zIndexProperties,
  borderProperties,
  minWidthProperties,
  maxWidthProperties,
  minHeightProperties,
  overflowProperties,
  opacityProperties,
  visibleProperties,
  maxHeightProperties,
  fontSizeProperties,
  fontWeightProperties
);

export type TBoxStyles = Parameters<typeof boxStyles>[0];
