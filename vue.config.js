process.env.VUE_APP_ORIGIN = process.env.ORIGIN;
process.env.VUE_APP_SERVER_PORT = process.env.SERVER_PORT;

module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "Ewyn Studios"
    }
  },
  transpileDependencies: ["vue-echarts", "resize-detector"]
};
