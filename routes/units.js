const router = require('express').Router();
const {
  createUnit,
  createUnits,
  getUnits,
  updateUnit,
  deleteUnit,
  getUnit,
} = require('../controllers/units');
const { validateCreateUnit, validateUpdateUnit, validateDeleteUnit } = require('../middlewares/validations');

router.get('/', getUnits);
router.get('/unit/:id', getUnit);
router.post('/', validateCreateUnit, createUnit);
router.post('/many-units', createUnits);
router.patch('/:id', validateUpdateUnit, updateUnit);
router.delete('/:id', validateDeleteUnit, deleteUnit);

module.exports = router;
