const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')

router.post('/', (req, res) => {
  console.log(req.body);
  const { username, password, breaktime } = req.body
  // ADD VALIDATION
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log('User.js post error: ', err)
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`
      })
    }
    else {
      const newUser = new User({
        username: username,
        password: password,
        breaktime: breaktime

      })
      newUser.save((err, savedUser) => {
        if (err) return res.json(err)
        res.json(savedUser)
      })
    }
  })
})

router.post(
  '/login',
  function (req, res, next) {
    next()
  },
  passport.authenticate('local'),
  (req, res) => {
    var userInfo = {
      username: req.user.username
    };
    res.send(userInfo);
  }
)

router.get('/', (req, res) => {
  console.log("get route", req.body);
  if (req.user) {
    res.json({ user: req.user })
  } else {
    res.json({ user: null })
  }
})


router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout()
    res.send({ msg: 'logging out' })
  } else {
    res.send({ msg: 'no user to log out' })
  }
})

router.put('/', (req, res) => {
  if (req.user) {
    User.findByIdAndUpdate({_id: req.user._id}, {breaktime: req.body.breaktime}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.send({ msg: 'no user' })
  }
})

router.get('/userdata', (req, res) => {
  if (req.user) {
    User.findById({_id: req.user._id}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.send({ msg: 'no user' })
  }
})

module.exports = router