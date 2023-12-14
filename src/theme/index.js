import { createTheme } from "@mui/material/styles";

import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";

const color = {
  paper: "#ffffff",
  primaryLight: "#eef2f6",
  primaryMain: "#2196f3",
  primaryDark: "#1e88e5",
  primary200: "#90caf9",
  primary800: "#1565c0",
  primaryPastel: "#d6e5f2",
  secondaryLight: "#ede7f6",
  secondaryMain: "#673ab7",
  secondaryDark: "#5e35b1",
  secondary100: "#d0c2ed",
  secondary200: "#b39ddb",
  secondary800: "#4527a0",
  secondaryPastel: "#e3dcef",
  successLight: "#b9f6ca",
  success200: "#69f0ae",
  successMain: "#00e676",
  successDark: "#00c853",
  success800: "#00b747",
  successPastel: "#bce8c1",
  errorLight: "#ef9a9a",
  errorMain: "#f44336",
  errorDark: "#c62828",
  error800: "#b02222",
  errorPastel: "#d69393",
  orangeLight: "#ffecb3",
  orangeMain: "#ff9800",
  orangeDark: "#f57c00",
  orange200: "#ffcc80",
  orange800: "#ef6c00",
  orangePastel: "#ffd1a3",
  pinkLight: "#ffcdd2",
  pinkMain: "#e91e63",
  pinkDark: "#c2185b",
  pink200: "#f48fb1",
  pink800: "#ad1457",
  pinkPastel: "#e1aeb5",
  warningLight: "#fff8e1",
  warningMain: "#ffe57f",
  warningDark: "#ffc107",
  grey50: "#f8fafc",
  grey100: "#eef2f6",
  grey200: "#e3e8ef",
  grey300: "#cdd5df",
  grey500: "#697586",
  grey600: "#4b5565",
  grey700: "#364152",
  grey900: "#121926",
  darkBackground: "#1a223f",
  darkPaper: "#111936",
  darkLevel1: "#29314f",
  darkLevel2: "#212946",
  darkPrimaryLight: "#eef2f6",
  darkPrimaryMain: "#2196f3",
  darkPrimaryDark: "#1e88e5",
  darkPrimary200: "#90caf9",
  darkPrimary800: "#1565c0",
  darkSecondaryLight: "#d1c4e9",
  darkSecondaryMain: "#7c4dff",
  darkSecondaryDark: "#651fff",
  darkSecondary200: "#b39ddb",
  darkSecondary800: "#6200ea",
  darkTextTitle: "#d7dcec",
  darkTextPrimary: "#bdc8f0",
  darkTextSecondary: "#8492c4",
};

export const theme = () => {
  const customization = {
    fontFamily: `'Poppins', sans-serif`,
    borderRadius: 12,
  };

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
    customization,
  };

  const themeOptions = {
    direction: "ltr",
    palette: themePalette(themeOption),
    typography: themeTypography(themeOption),
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
