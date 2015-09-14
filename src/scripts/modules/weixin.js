// 在微信场景中 --> JS-SDK
Mobird.defineModule('wm/modules/weixin', function(require, exports, module) {

  var weixin = {

    PAY_SUCCESS: 0,
    PAY_FAIL: 1,

    config: {
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: '',
      timestamp: '',
      nonceStr: '',
      signature: '',
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
      ]
    },

    shareData: {
      title: document.title,
      desc: '',
      link: '',
      imgUrl: '',
      success: Mobird.noop,
      cancel: Mobird.noop
    },

    // 用于配置 微信 JS-SDK config
    setConfig: function(callback) {

      Mobird.HTTP.post('/um/authcfg/wx', {
        url: location.href.replace(location.hash,'').replace('#', '')
      }, function(data) {
        if (data && data.result === 0) {
          weixin.config = Mobird.extend(weixin.config, data.root || {});
          if (typeof wx != 'undefined') {
            wx.config(weixin.config);
          }
        }
        if (Mobird.isFunction(callback)) {
          callback();
        }
      });

    },

    loadJWeixinScript: function() {
      document.write('<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>');
    },

    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    shareTimeline: function(data) {
      if (data) {
        weixin.shareData = Mobird.extend(weixin.shareData, data);
      }
      if (weixin.shareData.title && weixin.shareData.link) {
        wx.onMenuShareTimeline({
          title: weixin.shareData.title, // 分享标题
          link: weixin.shareData.link, // 分享链接
          imgUrl: weixin.shareData.imgUrl, // 分享图标
          success: weixin.shareData.success,
          cancel: weixin.shareData.cancel
        });
      }
    },

    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
    shareAppMessage: function(data) {
      if (data) {
        weixin.shareData = Mobird.extend(weixin.shareData, data);
      }
      if (weixin.shareData.title && weixin.shareData.link) {
        wx.onMenuShareAppMessage({
          title: weixin.shareData.title, // 分享标题
          desc: weixin.shareData.desc, // 分享描述
          link: weixin.shareData.link, // 分享链接
          imgUrl: weixin.shareData.imgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: weixin.shareData.success,
          cancel: weixin.shareData.cancel
        });
      }
    },

    share: function(data) {

      if (!weixin.isWeixin()) {
        return;
      }

      if (data) {
        weixin.shareData = Mobird.extend(weixin.shareData, data);
      }

      weixin.setConfig(function() {
        weixin.shareTimeline();
        weixin.shareAppMessage();
      });
    },

    // 用于 微信 JS-SDK 支付
    pay: function(wdata, callback) {

      if (Mobird.isUndefined(WeixinJSBridge)) {
        callback(weixin.PAY_SUCCESS);
      } else {
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
          'appId': wdata.appId, //公众号名称，由商户传入
          'timeStamp': wdata.timeStamp, //时间戳
          'nonceStr': wdata.nonceStr, //随机串
          'package': wdata.packageStr, //扩展包
          'signType': wdata.signType, //微信签名方式:1.sha1
          'paySign': wdata.paySign //微信签名
        }, function(res) {
          window.setTimeout(function() {
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
              callback(weixin.PAY_SUCCESS);
            } else {
              callback(weixin.PAY_FAIL);
            }
          }, 600);
        });
      }

    },

    // 用于 微信 获取用户地址
    address: function(wdata, callback) {

      if (Mobird.isUndefined(WeixinJSBridge)) {
        callback({});
      } else {
        WeixinJSBridge.invoke('editAddress', {
          'appId' : wdata.appId,
          'scope' : wdata.scope || 'jsapi_address',
          'signType' : wdata.signType || 'sha1',
          'addrSign' : wdata.addrSign,
          'timeStamp' : wdata.timeStamp,
          'nonceStr' : wdata.nonceStr
        }, function(res) {

          // err_msg
          //   edit_address:ok             获取编辑收货地址成功
          //   edit_address:fail           获取编辑收货地址失败
          // userName                      收货人姓名
          // telNumber                     收货人电话
          // addressPostalCode             邮编
          // proviceFirstStageName         国标收货地址第一级地址
          // addressCitySecondStageName    国标收货地址第二级地址
          // addressCountiesThirdStageName 国标收货地址第三级地址
          // addressDetailInfo             详细收货地址信息
          // nationalCode                  收货地址国家码
          //
          window.setTimeout(function() {

            if (res.err_msg == 'edit_address:ok') {
              callback(res);
            } else {
              callback({});
            }

          }, 600);

        });
      }

    },

    isWeixin: function() {
      var ua = navigator.userAgent.toLowerCase();
      return ua.indexOf('micromessenger') >= 0 || 'undefined' != typeof WeixinJSBridge;
    }

  };

  module.exports = weixin;

});