const router = require('express').Router();
const {
  createMatch,
  deleteMatch,
  getMatches,
  addUnitArray,
  updateMatch,
  updateTitle,
  updateUnitInMatch,
  updateResult,

} = require('../controllers/matches');

router.get('/', getMatches);
router.post('/', createMatch);
router.delete('/:id', deleteMatch);
router.post('/:id', addUnitArray);
router.patch('/:id', updateMatch);
router.patch('/:id/unit', updateUnitInMatch);
router.patch('/title', updateTitle);
router.patch('/result', updateResult);

module.exports = router;
