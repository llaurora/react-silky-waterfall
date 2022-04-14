const webpack = require("webpack");
const { merge } = require("webpack-merge");
const WebpackBar = require("webpackbar");
const notifier = require("node-notifier");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const baseConfig = require("./webpack.base.config");

const ifaces = require("os").networkInterfaces();

const PORT = process.env.PORT || 8080;
const protocol = String(PORT) === "443" ? "https://" : "http://";

module.exports = merge(baseConfig, {
    mode: "development",
    stats: {
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
        errors: false,
    },
    devtool: "eval-cheap-module-source-map",
    entry: ["./example/index.tsx", "webpack-hot-middleware/client"],
    output: {
        filename: "[name].js",
        chunkFilename: "[name].js",
        publicPath: "/",
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
    plugins: [
        new WebpackBar(),
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin({
            overlay: false,
        }),
        new ErrorOverlayPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: Object.values(ifaces).reduce(
                    (prev, cur) => {
                        for (const iface of cur) {
                            if (iface.family === "IPv4") {
                                prev.push(`${protocol}${iface.address}:${PORT}`);
                            }
                        }
                        return prev;
                    },
                    ["You application is running here:", `${protocol}localhost:${PORT}`],
                ),
            },
            onErrors: (severity, errors) => {
                if (severity !== "error") {
                    return;
                }
                const error = errors[0];
                notifier.notify({
                    title: "Webpack error",
                    message: `${severity}: ${error.name}`,
                    subtitle: error.file || "",
                });
            },
        }),
    ],
});
