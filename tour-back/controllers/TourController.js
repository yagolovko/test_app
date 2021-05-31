const { validationResult } = require('express-validator');
const dayjs = require('dayjs');

const ruLocale = require('dayjs/locale/ru');

const { groupBy, reduce } = require('lodash');

const { Tour, Place } = require('../models');

function TourController() {}

const create = async function(req, res) {
  const errors = validationResult(req);
  let place;

  const data = {
    place: req.body.place,
    fullname: req.body.fullname,
    description: req.body.description,
  };

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array(),
    });
  }

  try {
    place = await Place.findOne({ _id: data.place });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: 'PLACE_NOT_FOUND',
    });
  }

  Tour.create(data, function(err, doc) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err,
      });
    }

    res.status(201).json({
      success: true,
      data: doc,
    });
  });
};

const update = async function(req, res) {
  const tourId = req.params.id;
  const errors = validationResult(req);

  const data = {
    fullname: req.body.fullname,
    description: req.body.description,
  };

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array(),
    });
  }

  Tour.updateOne({ _id: tourId }, { $set: data }, function(err, doc) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err,
      });
    }

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: 'TOUR_NOT_FOUND',
      });
    }

    res.json({
      success: true,
    });
  });
};

const remove = async function(req, res) {
  const id = req.params.id;

  try {
    await Tour.findOne({ _id: id });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: 'TOUR_NOT_FOUND',
    });
  }

  Tour.deleteOne({ _id: id }, err => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err,
      });
    }

    res.json({
      status: 'succces',
    });
  });
};

const all = function(req, res) {
  Tour.find({})
    .populate('place')
    .exec(function(err, docs) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err,
        });
      }

      res.json({
        status: 'succces',
        data: reduce(
          groupBy(docs, 'date'),
          (result, value, key) => {
            result = [
              ...result,
              {
                title: dayjs(key)
                  .locale(ruLocale)
                  .format('D MMMM'),
                data: value,
              },
            ];
            return result;
          },
          [],
        ),
      });
    });
};

TourController.prototype = {
  all,
  create,
  remove,
  update,
};

module.exports = TourController;
