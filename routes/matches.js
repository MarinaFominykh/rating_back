const router = require('express').Router();
const {
  createMatch,
  deleteMatch,
  getMatches,
  addUnitArray,
  updateGameMaster,
  updateTitle,
  updateUnitInMatch,
  updateResult,

} = require('../controllers/matches');

router.get('/matches', getMatches);
router.post('/matches', createMatch);
router.delete('/matches/:id', deleteMatch);
router.post('/matches/:id', addUnitArray);
router.patch('/matches/gameMaster', updateGameMaster);
router.patch('/matches/title', updateTitle);
router.patch('/matches/unit', updateUnitInMatch);
router.patch('/matches/result', updateResult);

module.exports = router;
