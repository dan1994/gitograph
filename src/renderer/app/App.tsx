import * as React from "react";
import { ThemeProvider } from "@material-ui/core";
import { hot } from "react-hot-loader";

import { RepositoryContextProvider } from "renderer/app/store/Repository";
import theme from "renderer/app/Theme";
import Main from "renderer/app/Main";

const App: React.FC = () => {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <RepositoryContextProvider>
                    <Main />
                </RepositoryContextProvider>
            </ThemeProvider>
        </React.StrictMode>
    );
};

export default hot(module)(App);
