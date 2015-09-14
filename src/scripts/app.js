var WeimaoApp = new Mobird.Application({

  screens: {
    shelfScreen: {
      selector: '#shelfScreen',
      screenClass: Mobird.Screen.extend({})
    },
    goodsDetailsScreen: {
      selector: '#goodsDetailsScreen',
      screenClass: Mobird.Screen.extend({})
    }
  },

  routers: {
    '#/shelf': function(req, next) {
      debugger
    }
  },

  commands: {
    'showDialog': function() {
      debugger
    }
  }

})
  .on('before:start', function() {

    this.appCache = new Mobird.Storage({
      name: 'appCache',
      type: 'memory'
    });

    if (Mobird.Platform.isMobile()) {
      Mobird.$(document).ready(function() {
        Mobird.initializePlatform();
        Mobird.initializeViewport();
      });
    }

    // 获取 URL 链接参数
    this.appCache.set('urlParams', {

      isAppMode: Mobird.getParameterByName('wmode') === 'app',
      wemartIOSApp: Mobird.getParameterByName('wemartIOSApp') === 'true',
      shopId: Mobird.getParameterByName('shopId') || '',
      appId: /MicroMessenger/i.test(navigator.userAgent) ? '3' : (Mobird.getParameterByName('appId') || undefined),

      // 用于解决 喜马拉雅同步actionbar title问题
      syncTitle: Mobird.getParameterByName('syncTitle') === 'true',
      disableCache: false,

      // 为了兼容只支持支付宝支付的App
      supportWXPay: Mobird.getParameterByName('supportWXPay') === 'true',
      goodsPreview: Mobird.getParameterByName('goodsPreview') === 'true',
      hideWMFooter: Mobird.getParameterByName('hideWMFooter') === 'true',
      directBuy: Mobird.getParameterByName('directBuy') === 'true',
      userName: Mobird.getParameterByName('user_name') || '',
      userId: Mobird.getParameterByName('user_id') || Mobird.getParameterByName('userId') || '',
      sign: Mobird.getParameterByName('sign') || '',
      qbad: Mobird.getParameterByName('qbadid') || '', // 糗百消息流
      sdk: {},
      ordinateOffset: {}

    });

  })
  .on('start', function() {
    this.appRouter
      .errors(404, function() {
        console.warn('404', arguments);
      })
      .errors(500, function() {
        console.error('500', arguments);
      })
      .before(function(req, next) {
        next();
      })
      .run();
  });