const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./scripts/webpack.dev.config");
const router = require("./example/router")

const compiler = webpack(webpackConfig);
const app = express();
const { PORT = 8080 } = process.env;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.use("/public", express.static(path.resolve(__dirname, './example/assets')))

app.use("/mock", router);

app.use((req, res, next) => {
    if (!/(\.(?!html)\w+$|__webpack.*)/.test(req.url)) {
        req.url = "/"; // this would make express-js serve index.html
    }
    next();
});

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
    }),
);

app.use(webpackHotMiddleware(compiler));

app.listen(PORT, () => {
    console.log("\033[40;35mStarting the development server ...\033[0m");
});
