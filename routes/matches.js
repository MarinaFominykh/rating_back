const router = require('express').Router();
const {
  createMatch,
  deleteMatch,
  getMatches,
  updateMatch,

} = require('../controllers/matches');
const { validateCreateMatch, validateDeleteMatch, validateUpdateMatch } = require('../middlewares/validations');

router.get('/', getMatches);
router.post('/', validateCreateMatch, createMatch);
router.delete('/:id', validateDeleteMatch, deleteMatch);
router.patch('/:id', validateUpdateMatch, updateMatch);

module.exports = router;
