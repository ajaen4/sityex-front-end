import { createTheme } from "@mui/material/styles";

// assets
import colors from "assets/scss/colors.scss";

import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";

export const theme = () => {
  const color = colors;

  const customization = {
    fontFamily: `'Poppins', sans-serif`,
    borderRadius: 12
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
    customization
  };

  const themeOptions = {
    direction: "ltr",
    palette: themePalette(themeOption),
    typography: themeTypography(themeOption)
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
