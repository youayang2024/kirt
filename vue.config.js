const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "http://10.0.22.236:9889/",
  },
});
