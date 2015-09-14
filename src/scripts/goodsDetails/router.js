var GoodsDetailsView = Mobird.requireModule('wm/view/goodsDetails');

WeimaoApp.appRouter.addRoute('#/gd', function(req, next) {

  WeimaoApp.goodsDetailsScreen.show(new GoodsDetailsView({
    options: {
      orgShopId: req.get('orgShopId') || '',
      goodsNo: req.get('goodsNo') || ''
    }
  }));

});