Mobird.defineModule('wm/view', function(require, exports, module) {

  var WMView = Mobird.View.extend({

    getShopId: function() {
      return WeimaoApp.appCache.get('urlParams').shopId;
    },

    goTo: function(link) {
      if (link && link.indexOf('#') === 0) {
        location.hash = link;
      } else {
        window.location.href = link;
      }
    }

  });

  module.exports = WMView;

});