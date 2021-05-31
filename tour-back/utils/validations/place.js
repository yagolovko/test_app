const { check } = require('express-validator');

const validation = {
  create: [
    check('fullname').isLength({ min: 2 })
  ]
};

module.exports = validation;
