Mobird.defineModule('wm/view/shelf', function(require, exports, module) {

  var WMView = require('wm/view');

  var ShelfView = WMView.extend({

    events: {
      'click .wm-goback': 'goBackHandler',
      'click .wm-share': 'shareHandler'
    },

    template: Mobird.Template.compile([
      '<div class="mo-bar mo-bar-header mo-bar-transparent">',
        '<button class="mo-button mo-button-icon mo-icon wm-goback">',
          '<i class="fa fa-chevron-left"></i>',
        '</button>',
        '<div class="h1 mo-title">货架页</div>',
        '<button class="mo-button mo-button-icon mo-icon wm-share">',
          '<i class="fa fa-share-alt"></i>',
        '</button>',
      '</div>',
      '<div class="mo-scroll-content mo-has-header mo-has-tabs">',
        '<div class="mo-scroll">',
          //'<div class="mo-button-bar mo-bar-positive">',
          //  '<a class="mo-button mo-activated">First</a>',
          //  '<a class="mo-button">Second</a>',
          //  '<a class="mo-button">Third</a>',
          //'</div>',
          '<div class="mo-scroll-pulldown">',
            '<span class="mo-scroll-pulldown-icon"></span>',
            '<span class="mo-scroll-pulldown-label">Pull down to refresh...</span>',
          '</div>',
          '<ul class="mo-list">',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
            '<li class="mo-item">Item1</li>',
          '</ul>',
          '<div class="mo-scroll-pullup mo-loading">',
            '<span class="mo-scroll-pullup-icon"></span>',
            '<span class="mo-scroll-pullup-label">loading...</span>',
          '</div>',
        '</div>',
      '</div>',
      '<div class="mo-tabs mo-tabs-icon-top">',
        '<a class="mo-tab-item" href="#"><i class="mo-icon fa fa-camera"></i> 哈哈</a>',
        '<a class="mo-tab-item" href="#"><i class="mo-icon fa fa-comment"></i> 发发</a>',
        '<a class="mo-tab-item" href="#"><i class="mo-icon fa fa-share-alt"></i> 啦啦</a>',
      '</div>'
    ].join('')),

    render: function() {

      var self = this;

      this.super('render');

      var options = {
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true
      };

      Mobird.requestAnimationFrame(function () {

        var scroll_in_progress = false;

        var scrollerEl = self.$el.find('.mo-scroll-content').get(0);
        self.scroller = new Mobird.Scroller(scrollerEl, options);


      });

    },

    goBackHandler: function(e) {
      Mobird.ScreenTransition.goBack();
      return false;
    },

    shareHandler: function(e) {
      this.goTo('#/gd');
      return false;
    }

  });

  module.exports = ShelfView;

});