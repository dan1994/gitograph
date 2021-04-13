import { createMuiTheme, Theme, ThemeOptions } from "@material-ui/core";

interface IVscodeStyles {
    background: {
        primary: string;
        secondary: string;
        hover: string;
        menuHover: string;
    };
    scrollbar: {
        background: {
            primary: string;
            secondary: string;
        };
    };
    color: {
        primary: string;
        hover: string;
    };
    border: string;
}

interface IExtraThemeOptions {
    vscode: IVscodeStyles;
}

interface IThemeOptions extends ThemeOptions, IExtraThemeOptions {}
interface ITheme extends Theme, IExtraThemeOptions {}

const vscodeStyles: IVscodeStyles = {
    background: {
        primary: "#1e1e1e",
        secondary: "#323233",
        hover: "#474748",
        menuHover: "#094771",
    },
    scrollbar: {
        background: {
            primary: "#4f4f4f",
            secondary: "#6f6f6f",
        },
    },
    color: {
        primary: "#cccccc",
        hover: "#e0e0e0",
    },
    border: "1px solid #5a5a5a",
};

const theme = createMuiTheme({
    palette: {
        type: "dark",
    },
    vscode: vscodeStyles,
    overrides: {
        MuiCssBaseline: {
            "@global": {
                body: {
                    fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    backgroundColor: vscodeStyles.background.primary,
                    display: "flex",
                    justifyContent: "center",
                    color: vscodeStyles.color.primary,
                },
                "#root": {
                    width: "100vw",
                },
                "::-webkit-scrollbar": {
                    width: 0,
                },
                ".MuiPaper-root": {
                    color: vscodeStyles.color.primary,
                    backgroundColor: vscodeStyles.background.primary,
                },
            },
        },
    },
} as IThemeOptions);

export { theme, ITheme };
