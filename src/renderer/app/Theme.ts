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
                "::-webkit-scrollbar": {
                    width: "10px",
                    background: "#252526",
                },
                "::-webkit-scrollbar-track": {
                    borderRadius: "5px",
                    boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)",
                },
                "::-webkit-scrollbar-thumb": {
                    borderRadius: "5px",
                    background: "#606060",
                },
                "::-webkit-scrollbar-thumb:hover": {
                    background: "#707070",
                },
            },
        },
    },
});

export default theme;
