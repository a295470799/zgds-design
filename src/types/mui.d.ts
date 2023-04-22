import { Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    dark: Palette["primary"];
  }

  interface PaletteOptions {
    dark: PaletteOptions["primary"];
  }

  interface TypeText {
    primary: string;
    secondary: string;
    third: string;
    fourth: string;
    fifth: string;
    disabled: string;
  }

  export function createTheme(options?: ThemeOptions): Theme;
}

declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    dark: true;
  }
}
