const colors = {
  coolGray50: "#ffffff",
  coolGray75: "#f7f7f9",
  coolGray100: "#f3f4f6",
  coolGray200: "#e5e7eb",
  coolGray300: "#d1d5db",
  coolGray400: "#9ca3af",
  coolGray500: "#6b7280",
  coolGray600: "#4b5563",
  coolGray700: "#374151",
  coolGray800: "#1f2937",
  coolGray900: "#111827",
  purple50: "#f5f3ff",
  purple100: "#ede9fe",
  purple200: "#ddd6fe",
  purple300: "#c4b5fd",
  purple400: "#a78bfa",
  purple500: "#8b5cf6",
  purple600: "#7c3aed",
  purple700: "#6d28d9",
  purple800: "#5b21b6",
  purple900: "#4c1d95",
  indigo50: "#eef2ff",
  indigo100: "#e0e7ff",
  indigo200: "#c7d2fe",
  indigo300: "#a5b4fc",
  indigo400: "#818cf8",
  indigo500: "#6366f1",
  indigo600: "#4f46e5",
  indigo700: "#4338ca",
  indigo800: "#3730a3",
  indigo900: "#312e81",
  blue50: "#eff6ff",
  blue100: "#dbeafe",
  blue200: "#bfdbfe",
  blue300: "#93c5fd",
  blue400: "#60a5fa",
  blue500: "#3b82f6",
  blue600: "#2563eb",
  blue700: "#1d4ed8",
  blue800: "#1e40af",
  blue900: "#1e3a8a",
  green50: "#f3faf6",
  green100: "#e8f5ee",
  green200: "#d1ecdc",
  green300: "#a2d9b9",
  green400: "#74c597",
  green500: "#179f51",
  green600: "#158f49",
  green700: "#127f41",
  green800: "#0e5f31",
  green900: "#094020",
  amber50: "#fffbeb",
  amber100: "#fef3c7",
  amber200: "#fde68a",
  amber300: "#fcd34d",
  amber400: "#fbbf24",
  amber500: "#f59e0b",
  amber600: "#d97706",
  amber700: "#b45309",
  amber800: "#92400e",
  amber900: "#78350f",
  red50: "#fef2f2",
  red100: "#fee2e2",
  red200: "#fecaca",
  red300: "#fca5a5",
  red400: "#f87171",
  red500: "#ef4444",
  red600: "#dc2626",
  red700: "#b91c1c",
  red800: "#991b1b",
  red900: "#7f1d1d",
  pink50: "#fdf2f8",
  pink100: "#fce7f3",
  pink200: "#fbcfe8",
  pink300: "#f9a8d4",
  pink400: "#f472b6",
  pink500: "#ec4899",
  pink600: "#db2777",
  pink700: "#be185d",
  pink800: "#9d174d",
  pink900: "#831843",
};

export const COLORS = {
  surfaceErrorLowest: colors.red100,
  surfaceSuccessLowest: colors.green100,
  surfaceDefault: colors.coolGray50,
  surfaceError: colors.red700,
  surfaceErrorHover: colors.red800,
  surfacePrimary: colors.blue600,
  surfaceWarning: colors.amber700,
  surfaceSuccess: colors.green600,
  surfacePrimaryLowest: colors.blue50,
  surfaceWarningLowest: colors.amber100,
  surfaceNeutralLowest: colors.coolGray100,
  textSuccess: colors.green700,
  textHigh: colors.coolGray900,
  textOnSurface: colors.coolGray50,
  textWarning: colors.amber700,
  textLow: colors.coolGray500,
  textError: colors.red700,
  textPrimary: colors.blue600,
  textMedium: colors.coolGray600,
  iconError: colors.red700,
  iconMedium: colors.coolGray600,
  iconPrimary: colors.blue600,
  iconLow: colors.coolGray500,
  iconSuccess: colors.green700,
  iconHigh: colors.coolGray800,
  iconWarning: colors.amber700,
  iconOnSurface: colors.coolGray50,
  borderWarningLow: colors.amber300,
  borderSuccessLowest: colors.green100,
  borderWarningLowest: colors.amber100,
  borderSeparator: colors.coolGray200,
  borderError: colors.red700,
  borderPrimary: colors.blue600,
  transparent: "transparent",
  textWhite: "#fff",
} as const;

export const BREAKPOINTS = {
  xs: {},
  sm: { "@media": "screen and (min-width: 640px)" },
  md: { "@media": "screen and (min-width: 768px)" },
  lg: { "@media": "screen and (min-width: 1024px)" },
  xl: { "@media": "screen and (min-width: 1280px)" },
  "2xl": { "@media": "screen and (min-width: 1440px)" },
} as const;

export const BREAKPOINTS_NAMES = Object.keys(
  BREAKPOINTS
) as never as keyof typeof BREAKPOINTS;

export const SPACING = {
  "0": "0",
  px: "1px",
  "1": ".25rem",
  "2": ".5rem",
  "3": ".75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "18": "4.5rem",
  "24": "6rem",
  auto: "auto",
} as const;

export const SIZES = {
  ...SPACING,
  "1/2": "50%",
  "1/3": "33.33333%",
  full: "100%",
  "fit-content": "fit-content",
} as const;
