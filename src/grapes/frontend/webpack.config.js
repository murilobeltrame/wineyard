const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const { DefinePlugin } = require("webpack");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "wineyard",
    projectName: "grapes",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new DefinePlugin({
        "process.env.BACKEND_URL": JSON.stringify(webpackConfigEnv.backendUrl),
      }),
    ],
  });
};
