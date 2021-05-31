const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlaceSchema = new Schema(
  {
    id: String,
    fullname: String,
    description: String
  },
  {
    timestamps: true
  }
);

PlaceSchema.virtual('tours', {
  ref: 'Tour',
  localField: '_id',
  foreignField: 'place',
  justOne: false // set true for one-to-one relationship
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
