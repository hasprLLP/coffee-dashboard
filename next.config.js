const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  env: {
    appName: 'Coffee',
    JWT_SECRET: 'Coffee',
    SERVER_URL: 'http://localhost:8080/api/v1/',
    //SERVER_URL: 'https://coffeecenterbus.herokuapp.com/api/v1/',
    NEXT_PUBLIC_GOOGLE_ANALYTICS: 'G-VXB0G37H90',
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
  },
  swcMinify: true,
});
