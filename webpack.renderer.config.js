const path = require("path");

const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");

rules.push({
    test: /\.css$/,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

module.exports = {
    module: {
        rules,
    },
    plugins: plugins,
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
        alias: {
            "react-dom": "@hot-loader/react-dom",
            main: path.resolve(__dirname, "src/main"),
            renderer: path.resolve(__dirname, "src/renderer"),
            shared: path.resolve(__dirname, "src/shared"),
        },
    },
};
