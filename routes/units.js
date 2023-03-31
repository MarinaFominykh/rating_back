const router = require('express').Router();
const {
  createUnit,
  createUnits,
  getUnits,
  updateUnit,
  deleteUnit,
  getUnit,
} = require('../controllers/units');

router.get('/', getUnits);
router.get('/unit/:id', getUnit);
router.post('/', createUnit);
router.post('/many-units', createUnits);
router.patch('/', updateUnit);
router.delete('/:id', deleteUnit);

module.exports = router;
