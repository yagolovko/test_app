const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const db = require('./core/db');
const { placeValidation, tourValidation, cultplaceValidation } = require('./utils/validations');
const { PlaceCtrl, TourCtrl, CultPlaceCtrl } = require('./controllers');

const app = express();
app.use(express.json());
app.use(cors());


app.get('/places', PlaceCtrl.all);
app.post('/places', placeValidation.create, PlaceCtrl.create);
app.delete('/places/:id', PlaceCtrl.remove);
app.patch('/places/:id', placeValidation.create, PlaceCtrl.update);
app.get('/places/:id', PlaceCtrl.show);

app.get('/cultplaces', CultPlaceCtrl.all);
app.post('/cultplaces', cultplaceValidation.create, CultPlaceCtrl.create);
app.delete('/cultplaces/:id', CultPlaceCtrl.remove);
app.patch('/cultplaces/:id', cultplaceValidation.create, CultPlaceCtrl.update);
app.get('/cultplaces/:id', CultPlaceCtrl.show);

app.get('/tours', TourCtrl.all);
app.post('/tours', TourCtrl.create);
app.delete('/tours/:id', TourCtrl.remove);
app.patch('/tours/:id', tourValidation.update, TourCtrl.update);

app.listen(6666, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('Server runned!');
});
