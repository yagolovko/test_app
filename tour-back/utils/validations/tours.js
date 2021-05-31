const { check } = require('express-validator');

const validation = {
  update: [
    check('dentNumber').isInt({ min: 1, max: 48 }),
    check('price').isInt({ min: 0, max: 200000 }),
  ]
};

module.exports = validation;
