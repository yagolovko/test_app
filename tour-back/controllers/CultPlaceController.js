const { validationResult } = require('express-validator');
const { CultPlace } = require('../models');

function CultPlaceContoller() {}

const create = function(req, res) {
  const errors = validationResult(req);
  const data = {
    fullname: req.body.fullname,
    descriptions: req.body.description
  };

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array()
    });
  }

  CultPlace.create(data, function(err, doc) {
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
  const cultplaceId = req.params.id;
  const errors = validationResult(req);

  const data = {
    fullname: req.body.fullname,
    descriptions: req.body.description
  };

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array()
    });
  }

  CultPlace.updateOne({ _id: cultplaceId }, { $set: data }, function(err, doc) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err
      });
    }

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: 'CULTPLACE_NOT_FOUND'
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
    await CultPlace.findOne({ _id: id });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: 'CULTPLACE_NOT_FOUND'
    });
  }

  CultPlace.deleteOne({ _id: id }, err => {
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
    const cultplace = await CultPlace.findById(id)
      .exec();

    res.json({
      status: 'succces',
      data: { ...cultplace._doc}
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: 'CULTPLACE_NOT_FOUND'
    });
  }
};

const all = function(req, res) {
 CultPlace.find({}, function(err, docs) {
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

CultPlaceContoller.prototype = {
  all,
  create,
  update,
  remove,
  show
};

module.exports = CultPlaceContoller;
