const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("dotenv").config();

const devMode = process.env.NODE_ENV === "development";
const ROOT_DIR = path.resolve(__dirname, "..");
const resolve = (...args) => path.resolve(ROOT_DIR, ...args);
const SRC_DIR = resolve("src");
const EXAMPLE_DIR = resolve("example");

module.exports = {
    target: "browserslist",
    context: ROOT_DIR,
    cache: {
        type: "filesystem",
        buildDependencies: {
            config: [__filename],
        },
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            "@": resolve("src"),
        },
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                loader: "babel-loader",
                include: [SRC_DIR, EXAMPLE_DIR],
                options: {
                    plugins: [devMode && require.resolve("react-refresh/babel")].filter(Boolean),
                },
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg|ico)$/,
                include: [SRC_DIR, EXAMPLE_DIR],
                type: "asset",
                generator: {
                    filename: devMode ? "[name][ext]" : "images/[hash][ext][query]",
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024, // 8kb
                    },
                },
            },
            {
                test: /\.(eot|woff|ttf|woff2|appcache)(\?|$)/,
                include: [SRC_DIR, EXAMPLE_DIR],
                type: "asset/resource",
                generator: {
                    filename: devMode ? "[name][ext]" : "fonts/[hash][ext][query]",
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: [SRC_DIR, EXAMPLE_DIR],
                use: [
                    devMode
                        ? "style-loader"
                        : {
                              loader: MiniCssExtractPlugin.loader,
                              options: {
                                  publicPath: "../",
                              },
                          },
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                        },
                    },
                    "postcss-loader",
                    "resolve-url-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "react-waterfull",
            filename: "index.html",
            template: path.resolve(process.cwd(), "./public/template.html"), // template path
            favicon: path.resolve(process.cwd(), "./public/favicon.ico"),
            inject: true,
        }),
    ],
};
