const mongoose = require('mongoose');
const { Schema } = mongoose;

const TourSchema = new Schema(
  {
    fullname: String,
    description: String,
    place: { type: Schema.Types.ObjectId, ref: 'Place' }
  },
  {
    timestamps: true
  }
);

const Tour = mongoose.model('Tour', TourSchema);

module.exports = Tour;
