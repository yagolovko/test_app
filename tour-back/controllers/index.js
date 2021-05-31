const PlaceController = require('./PlaceController');
const CultPlaceController = require('./CultPlaceController');
const TourController = require('./TourController');

module.exports = {
  PlaceCtrl: new PlaceController(),
  CultPlaceCtrl: new CultPlaceController(),
  TourCtrl: new TourController()
};
