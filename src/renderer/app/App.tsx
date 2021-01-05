import * as React from "react";
import { hot } from "react-hot-loader";

import DirectedGraph from "renderer/app/graph/DirectedGraph";

import GraphGenerator from "renderer/app/algorithm/GraphGenerator";
import { dummyCommits } from "renderer/app/dummy";

const App: React.FC = () => {
    const graphGenerator = new GraphGenerator(dummyCommits);

    return (
        <>
            <React.StrictMode>
                <DirectedGraph graph={graphGenerator.generate()} />
            </React.StrictMode>
        </>
    );
};

export default hot(module)(App);
