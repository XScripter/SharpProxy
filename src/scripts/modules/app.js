// 在APP场景中
Mobird.defineModule('wm/modules/app', function(require, exports, module) {

  var app = {

    isWemartApp: function() {
      return typeof WemartJSBridge !== 'undefined';
    }

  };

  module.exports = app;

});