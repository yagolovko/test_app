const { validationResult } = require('express-validator');
const { Place } = require('../models');

function PlaceContoller() {}

const create = function(req, res) {
  const errors = validationResult(req);
  const data = {
    fullname: req.body.fullname,
    phone: req.body.phone
  };

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array()
    });
  }

  Place.create(data, function(err, doc) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err
      });
    }

    res.status(201).json({
      success: true,
      data: doc
    });
  });
};

const update = async function(req, res) {
  const placeId = req.params.id;
  const errors = validationResult(req);

  const data = {
    fullname: req.body.fullname,
    phone: req.body.phone
  };

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array()
    });
  }

  Place.updateOne({ _id: placeId }, { $set: data }, function(err, doc) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err
      });
    }

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: 'PLACE_NOT_FOUND'
      });
    }

    res.json({
      success: true
    });
  });
};

const remove = async function(req, res) {
  const id = req.params.id;

  try {
    await Place.findOne({ _id: id });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: 'PLACE_NOT_FOUND'
    });
  }

  Place.deleteOne({ _id: id }, err => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err
      });
    }

    res.json({
      status: 'succces'
    });
  });
};

const show = async function(req, res) {
  const id = req.params.id;
  try {
    const place = await Place.findById(id)
      .populate('tours')
      .exec();

    res.json({
      status: 'succces',
      data: { ...place._doc, tours: place.tours }
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: 'PLACE_NOT_FOUND'
    });
  }
};

const all = function(req, res) {
  Place.find({}, function(err, docs) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err
      });
    }

    res.json({
      status: 'succces',
      data: docs
    });
  });
};

PlaceContoller.prototype = {
  all,
  create,
  update,
  remove,
  show
};

module.exports = PlaceContoller;
