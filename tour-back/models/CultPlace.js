const mongoose = require('mongoose');
const { Schema } = mongoose;

const CultPlaceSchema = new Schema(
  {
    id: String,
    fullname: String,
    descriptions: String
  },
  {
    timestamps: true
  }
);

const CultPlace = mongoose.model('CultPlace', CultPlaceSchema);

module.exports = CultPlace;
