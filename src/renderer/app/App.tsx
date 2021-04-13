import * as React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { hot } from "react-hot-loader";

import { RepositoryContextProvider, theme } from "renderer/app/global";
import { Router, WindowFrame } from "renderer/app/global/components";

const App: React.FC = () => {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RepositoryContextProvider>
                    <WindowFrame>
                        <Router />
                    </WindowFrame>
                </RepositoryContextProvider>
            </ThemeProvider>
        </React.StrictMode>
    );
};

export default hot(module)(App);
