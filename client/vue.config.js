const fs = require("fs");

let dev = process.env.NODE_ENV === "development" ? true : false;

module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8082,
    public: !dev ? "https://xornet.cloud" : undefined,
    https: !dev ? true : undefined,
    cert: !dev ? fs.readFileSync("./cert.pem") : undefined,
    key: !dev ? fs.readFileSync("./key.pem") : undefined
  }
};