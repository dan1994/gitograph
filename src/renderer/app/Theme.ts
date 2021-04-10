import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        type: "dark",
    },
    overrides: {
        MuiCssBaseline: {
            "@global": {
                body: {
                    fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                    background: "#252526",
                    color: "beige",
                    display: "flex",
                    justifyContent: "center",
                },
                "#root": {
                    width: "100vw",
                },
            },
        },
    },
});

export default theme;
