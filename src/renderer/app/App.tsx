import * as React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { hot } from "react-hot-loader";

import { RepositoryContextProvider } from "renderer/app/global/context/Repository";
import { theme } from "renderer/app/global/Theme";
import Router from "renderer/app/global/components/Router";
import WindowFrame from "renderer/app/global/components/WindowFrame";

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
