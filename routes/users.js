var express = require('express');
var router = express.Router();
var users = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* Post and create a user */
router.post('/', (req, res, next) => {
	console.log(req)
  users.create({
    username: req.body.username,
    email:    req.body.email,
    password: req.body.password,
    admin: false
  })
  .then(() => res.status(200).send())
  .catch((e) => res.status(500).json({ message: e.message }));
});

module.exports = router;