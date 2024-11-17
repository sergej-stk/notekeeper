const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api/v3": {
        target: "http://localhost:4017",
        changeOrigin: true,
        pathRewrite: { "^/api/v3": "/api/v3" },
      },
      "/socket.io": {
        target: "http://localhost:8086",
        changeOrigin: true,
        ws: true,
      },
      "/sockjs-node": {
        target: "http://localhost:8086",
        ws: false,
        changeOrigin: true,
      },
    },
  },
});
