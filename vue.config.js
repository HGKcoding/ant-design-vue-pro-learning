module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      //https://github.com/chimurai/http-proxy-middleware#proxycontext-config
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        /**
         * https://webpack.js.org/configuration/dev-server/
         * Sometimes you don't want to proxy everything. It is possible to bypass the proxy based on the return value of a function.
         * In the function you get access to the request, response and proxy options. It must return either false or a path that will be served instead of continuing to proxy the request.
         */
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            console.log("正在使用mock数据");
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)]; // 清除mock缓存
            return res.send(result);
          }
        }
      }
    }
  }
};
