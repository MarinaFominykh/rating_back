const router = require('express').Router();
// const auth = require('../middlewares/auth');

const {
  getUsers,
} = require('../controllers/users');

// router.use(auth);
router.get('/', getUsers);
module.exports = router;
