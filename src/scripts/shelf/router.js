var ShelfView = Mobird.requireModule('wm/view/shelf');

WeimaoApp.appRouter.addRoute('#/shelf1', function(req, next) {

  WeimaoApp.shelfScreen.show(new ShelfView());

});