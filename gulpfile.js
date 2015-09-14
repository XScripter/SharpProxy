var gulp = require('gulp');
var argv = require('minimist')(process.argv.slice(2));

var proxy = require('./build/proxy');

gulp.task('proxy', proxy(gulp, {
  port: 9000,
  proxyPort: 7070,
  env: argv.env || 'prod',
  localStaticFiles: ['www', 'src'],
  proxyRouters: {
    '/gm/goods/basic': './mockup/goodsBasic.json'
  },
  proxyPath: '/index.html',
  proxyHost: 'localhost',
  proxyProtocol: 'http:',
  customRouters: []
}));