var rewriteModule = require('http-rewrite-middleware');
var open = require('open');

var fs = require('fs');
var _ = require('underscore');
var connect = require('connect');
var url = require('url');
var connectRoute = require('connect-route');
var proxyMiddleware = require('./proxy-middleware');

var proxyEnvMap = {
  'dev': require('../config/dev-proxy-conf'),
  'qa': require('../config/qa-proxy-conf'),
  'uat': require('../config/uat-proxy-conf'),
  'prod': require('../config/prod-proxy-conf')
};

function fromFile(testFile) {
  return function(req, res, next) {
    fs.readFile(testFile, {
      encoding: 'UTF-8'
    }, function(err, data) {
      if (err) {
        console.log('failed to read ', err);
      }
      res.end(data);
    });
  };
}

var startProxy = function(options) {
  var port = options.port;
  var routeCfg = options.routeConfig || {};
  var customRouters = options.customRouters || [];
  var env = options.env;
  var proxyConfigs = proxyEnvMap[env];

  console.log('routerCfg are ' + routeCfg);

  var app = connect();

  app.use(connectRoute(function(router) {
    Object.keys(routeCfg).forEach(function(path) {
      var file = routeCfg[path];
      console.log('config routing ' + path + ' to file ' + file);
      router.get(path, fromFile(file));
      router.post(path, fromFile(file));
    });

    /*
     router.get('/SomeOther/*', function(req, res, next) {
     //custom reponse
     res.end('');
     });
     */
    _.each(customRouters, function(handler, router) {
      router.get(router, handler);
    });

  }));

  app.use('/', proxyMiddleware(proxyConfigs));
  app.listen(port);
};

module.exports = function(gulp, config) {

  var port = config.port;
  var proxyPort = config.proxyPort;
  var currentEnv = config.env;
  var localStaticFiles = config.localStaticFiles || ['www'];
  var proxyRouters = config.proxyRouters || {};
  var proxyPath = config.proxyPath || '/index.html';
  var proxyHost = config.proxyHost || 'localhost';
  var proxyProtocol = config.proxyProtocol || 'http:';
  var customRouters = config.customRouters || [];

  var app = connect();

  return function() {

    var middleware = [];

    _.each(localStaticFiles, function(file) {
      middleware.push({
        from: '^/' + file + '/(.*)$',
        to: '/$1'
      });
    });

    app.use(rewriteModule.getMiddleware(middleware));

    _.each(localStaticFiles, function(file) {
      app.use(connect.static(file));
    });

    app.listen(port);

    startProxy({
      port: proxyPort,
      routeConfig: proxyRouters,
      env: currentEnv,
      customRouters: customRouters
    });

    open(proxyProtocol + '//' + proxyHost + ':' + proxyPort + proxyPath, 'chrome');

  };

};