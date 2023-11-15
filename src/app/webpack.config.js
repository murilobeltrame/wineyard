const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "wineyard";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          onCompose: webpackConfigEnv && webpackConfigEnv.onCompose,
          rootConfigUrl: JSON.stringify(webpackConfigEnv.rootConfigUrl),
          scaffoldMfeUrl: JSON.stringify(webpackConfigEnv.scaffoldMfeUrl),
          countriesMfeUrl: JSON.stringify(webpackConfigEnv.countriesMfeUrl),
          grapesMfeUrl: JSON.stringify(webpackConfigEnv.grapesMfeUrl),
          winesMfeUrl: JSON.stringify(webpackConfigEnv.winesMfeUrl),
          orgName,
        },
      }),
    ],
  });
};
