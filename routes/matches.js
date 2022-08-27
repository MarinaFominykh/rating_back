const router = require('express').Router();
const {
  createMatch,
  deleteMatch,
  getMatches,
  addUnitArray,
} = require('../controllers/matches');

router.get('/matches', getMatches);
router.post('/matches', createMatch);
router.delete('/matches/:id', deleteMatch);
router.post('/matches/:id', addUnitArray);

module.exports = router;
