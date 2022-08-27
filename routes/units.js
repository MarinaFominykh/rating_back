const router = require('express').Router();
const {
  createUnit,
  getUnits,
} = require('../controllers/units');

router.get('/units', getUnits);
router.post('/units', createUnit);

module.exports = router;
