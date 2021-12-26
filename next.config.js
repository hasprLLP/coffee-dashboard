const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  env: {
    appName: "Coffee",
    JWT_SECRET: "Coffee",
    // SERVER_URL: 'http://localhost:8080/api/v1/',
    SERVER_URL: "https://coffeecenterbus.herokuapp.com/api/v1/",
    NEXT_PUBLIC_GOOGLE_ANALYTICS: "G-VXB0G37H90",
    MAP_KEY: "AIzaSyCJa0NdXTwLt2IwUyHhj1Gzy0Fe56vP_G8",
    IDENTITY_KEY: "AIzaSyC3E418LZBq8oU8B6vLIdN_K8g2fOrh1B4",
  },
  pwa: {
    dest: "public",
    runtimeCaching,
    disable: process.env.NODE_ENV === "development",
  },
  swcMinify: true,
});
