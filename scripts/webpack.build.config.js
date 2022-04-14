const path = require("path");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
    mode: "production",
    devtool: false,
    stats: {
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
    },
    entry: "./src/index.ts",
    output: {
        publicPath: "",
        clean: true,
        path: path.resolve(process.cwd(), "dist"),
        filename: "js/[name].[contenthash].js",
        chunkFilename: "js/[name].[contenthash].js",
    },
    performance: {
        hints: false,
    },
    plugins: [
        new MiniCssExtractPlugin({
            ignoreOrder: true,
            filename: "css/[name].[contenthash].css",
            chunkFilename: "css/[name].[contenthash].css",
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
        }),
    ],
    optimization: {
        minimize: true,
        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}`,
        },
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    warnings: false,
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                        drop_console: true,
                        drop_debugger: true,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
            }),
        ],
        splitChunks: {
            chunks: "all",
            automaticNameDelimiter: ".",
            minSize: 20_000,
            maxSize: 800_000,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                defaultVendors: {
                    test: /[/\\]node_modules[/\\]/,
                    name: "vendors",
                    chunks: "all",
                    priority: -10,
                },
                react: {
                    name: "react",
                    test: /[/\\](react|react-dom)[/\\]/,
                    chunks: "all",
                    priority: 10,
                },
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    priority: 20,
                },
            },
        },
    },
});
