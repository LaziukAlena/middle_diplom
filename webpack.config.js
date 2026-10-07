const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/", // HTML подключает dist/bundle.js
    clean: true,
  },
  devtool: "source-map",
  devServer: {
    static: { directory: __dirname }, // отдаёт index.html, css/, images/, fonts/
    watchFiles: ["*.html", "css/**/*"],
    port: 3000,
    open: true,
  },
};
