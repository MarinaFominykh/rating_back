const router = require('express').Router();
const {
  createUnit,
  getUnits,
  updateUnit,
  deleteUnit,
  getUnit,
} = require('../controllers/units');

router.get('/units', getUnits);
router.get('/unit/:id', getUnit);
router.post('/units', createUnit);
router.patch('/units', updateUnit);
router.delete('/units/:id', deleteUnit);

module.exports = router;
