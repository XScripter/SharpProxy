Mobird.defineModule('wm/view/goodsDetails', function(require, exports, module) {

  var WMView = require('wm/view');

  var GoodsDetailsView = WMView.extend({

    options: {
      orgShopId: '',
      goodsNo: ''
    },

    events: {
      'click .wm-goback': 'goBackHandler',
      'click .wm-share': 'shareHandler'
    },

    template: Mobird.Template.compile([
      '<div class="mo-bar mo-bar-header mo-bar-transparent">',
        '<button class="mo-button mo-button-icon mo-icon wm-goback">',
          '<i class="fa fa-chevron-left"></i>',
        '</button>',
        '<div class="h1 mo-title">商品详情页</div>',
        '<button class="mo-button mo-button-icon mo-icon wm-share">',
          '<i class="fa fa-share-alt"></i>',
        '</button>',
      '</div>'
    ].join('')),

    render: function() {

      var self = this;

      Mobird.HTTP.get('/gm/goods/basic', {

      }, function(error, response) {

        var data = JSON.parse(response.content);

        if (data.result === 0) {
          var $template = Mobird.$(self.template(data.root));
          self.$el.html($template);
        }

      });

    },

    goBackHandler: function(e) {
      Mobird.ScreenTransition.goBack();
      return false;
    },

    shareHandler: function(e) {
      this.goTo('#/shelf1');
      return false;
    }

  });

  module.exports = GoodsDetailsView;

});