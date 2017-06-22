var express = require('express');
var router = express.Router();
var passport = require('passport');
var userModel = require('../models/user');
var verify = require('./verify');

/* GET users listing. */
router.route('/').get(verify.verifyOrdinaryUser, function (req, res, next)
{
  var userId = req.decoded._doc._id;

  userModel.findById(userId, function (err, user)
  {
    if (err) return next(err);
    if (user)
    {
      res.json(user);
    }
    else
    {
      res.json([]);
    }
  });
});

router.post('/register', function(req, res)
{
    userModel.register
    (
      new userModel(
      {
        username : req.body.username,
        email : req.body.email,
        documentNumber : req.body.documentNumber
      }),
      req.body.password,
      function(err, user)
      {
        if (err)
        {
            return res.status(500).json({err: err});
        }
        passport.authenticate('local')(req, res, function ()
        {
            return res.status(200).json({status: 'Registration Successful!'});
        });
      }
    );
});

router.post('/login', function(req, res, next)
{
  passport.authenticate('local', function(err, user, info)
  {
    if (err)
    {
      return next(err);
    }
    if (!user)
    {
      return res.status(401).json(
      {
        err: info
      });
    }
    req.logIn(user, function(err)
    {
      if (err)
      {
        return res.status(500).json(
        {
          err: 'Could not log in user'
        });
      }

      var token = verify.getToken(user);
      res.status(200).json(
      {
        status: 'Login successful!',
        success: true,
        token: token,
        userId: user._id
      });
    });
  })(req,res,next);
});

router.options('/login', function(req, res, next)
{

  console.log(req.body);


  passport.authenticate('local', function(err, user, info)
  {
    if (err)
    {
      return next(err);
    }
    if (!user)
    {
      console.log("aqui");
      return res.status(401).json(
      {
        err: info
      });
    }
    req.logIn(user, function(err)
    {
      if (err)
      {
        return res.status(500).json(
        {
          err: 'Could not log in user'
        });
      }

      var token = verify.getToken(user);
      res.status(200).json(
      {
        status: 'Login successful!',
        success: true,
        token: token,
        userId: user._id
      });
    });
  })(req,res,next);
});

router.get('/logout', function(req, res)
{
  req.logout();
  res.status(200).json(
  {
    status: 'Bye!'
  });
});

router.route('/tags').get(verify.verifyOrdinaryUser, function (req, res, next)
{
  var userId = req.decoded._doc._id;
  userModel.findById(userId, function (err, user)
  {
    if (err) return next(err);
    if (user)
    {
      res.json(user.tags);
    }
    else
    {
      res.json([]);
    }
  });
});

router.route('/tags').post(verify.verifyOrdinaryUser, function (req, res, next)
{
  var userId = req.decoded._doc._id;
  userModel.findById(userId, function (err, user)
  {
    if (err) return next(err);

    if (user)
    {

      var tagFind = user.tags.find(o => o.tag === req.body.tag);
      if (tagFind)
      {
        console.log('tag: ' + tagFind);
        console.log('tag2: ' + tagFind.tag);
        console.log('tag3: ' + req.body.tag);
        //return next(new Error('duplicated tag'));
        res.json(user);
      }
      else
      {
        try
        {
          user.tags.push(req.body);
        }
        catch (e)
        {
          return next(e);
        }

        user.save(function (err, user)
        {
          if (err) return next(err);
          console.log('Updated Tags!');
          res.json(user);
        });
      }
    }
    else
    {
      return next(new Error('Invalid user'));
      //return next([]);
    }
  });
});

router.route('/tags/:tagId').delete(verify.verifyOrdinaryUser, function (req, res, next)
{
  var userId = req.decoded._doc._id;
  userModel.findById(userId, function (err, user)
  {
    if (err) return next(err);
    if (user)
    {
      try
      {
        user.tags.id(req.params.tagId).remove();
      }
      catch (e)
      {
        return next(e);
      }

      user.save(function (err, resp)
      {
          if (err) return next(err);
          res.json(resp);
      });
    }
    else
    {
      return next(new Error('Invalid user'));
    }
  });
});

module.exports = router;
