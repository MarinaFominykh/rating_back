const router = require('express').Router();
const {
  createUnit,
  createUnits,
  getUnits,
  updateUnit,
  deleteUnit,
  getUnit,
} = require('../controllers/units');

router.get('/units', getUnits);
router.get('/unit/:id', getUnit);
router.post('/units', createUnit);
router.post('/many-units', createUnits);
router.patch('/units', updateUnit);
router.delete('/units/:id', deleteUnit);

module.exports = router;
