// const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
// module.exports = function override(config, env) {
//   config.plugins = config.plugins.map((plugin) => {
//     if (plugin.constructor.name === "GenerateSW") {
//       return new WorkboxWebpackPlugin.InjectManifest({
//        swSrc: "./src/serviceWorker.js",
//        swDest: "serviceWorker.js"
//       });
//     }
//     return plugin;
//   });
//   return config;
// };