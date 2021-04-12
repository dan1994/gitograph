import * as React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { hot } from "react-hot-loader";

import { RepositoryContextProvider } from "renderer/app/store/Repository";
import { theme } from "renderer/app/Theme";
import Main from "renderer/app/Main";
import WindowFrame from "renderer/app/WindowFrame";

const App: React.FC = () => {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RepositoryContextProvider>
                    <WindowFrame>
                        <Main />
                    </WindowFrame>
                </RepositoryContextProvider>
            </ThemeProvider>
        </React.StrictMode>
    );
};

export default hot(module)(App);
