var express = require('express');
var router = express.Router();
var passport = require('passport');
var licitationModel = require('../models/licitation');
var userModel = require('../models/user');
var verify = require('./verify');
var moment = require('moment');

router.route('/').get(function (req, res, next)
{
  licitationModel.find({},
  function (err, licitations)
  {
    if (err) return next(err);
    res.json({licitations: licitations});
  });
});

router.route('/').post(function (req, res, next)
{
  var id = "";
  var title = [];
  var description = [];
  var deliveryDate = "";

  if (req.body.id)
  {
    id = req.body.id;

    licitationModel.find({"_id" : id},
    function (err, licitations)
    {
      if (err)
      {
        res.json([]);
      }
      else
      {
        res.json(licitations);
      }
    });
  }
  else
  {
    if (req.body.title)
    {
      title.push(new RegExp(req.body.title, 'i'));

      licitationModel.find({"title" : {$in: title}},
      function (err, licitations)
      {
        if (err) return next(err);
        res.json(licitations);
      });
    }
    else
    {
      if (req.body.description)
      {
        description.push(new RegExp(req.body.description, 'i'));

        licitationModel.find({"description" : {$in: description}},
        function (err, licitations)
        {
          if (err) return next(err);
          res.json(licitations);
        });
      }
      else
      {
        if (req.body.deliveryDate)
        {
          deliveryDate = moment(req.body.deliveryDate, "DD/MM/YYYY").toDate();

          licitationModel.find({"deliveryDate" : {$eq: deliveryDate}},
          function (err, licitations)
          {
            if (err) return next(err);
            res.json(licitations);
          });
        }
        else
        {
          res.json([]);
        }
      }
    }
  }
});

router.route('/moc').post(function (req, res, next)
{
  var newLicitation = new licitationModel(
  {
    title : req.body.title,
    description : req.body.description,
    deliveryDate : moment(req.body.deliveryDate, "DD/MM/YYYY").toDate(),
    publishDate : moment(req.body.publishDate, "DD/MM/YYYY").toDate()
  });

  licitationModel.create(newLicitation,
  function (err, licitation)
  {
    if (err) return next(err);

    var id = licitation._id;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Added the licitation with id: ' + id);
  });
});

router.route('/user').post(verify.verifyOrdinaryUser, function (req, res, next)
{
  var userId = req.decoded._doc._id;
  var currentDateStr = moment().format("YYYY-MM-DD");
  var currentDate = moment(currentDateStr, "YYYY-MM-DD").toDate();

  userModel.findById(userId, function (err, user)
  {
    if (err) return next(err);
    if (user)
    {
      var tags = user.tags;
      var tagsFind = [];

      for (var i = 0, len = tags.length; i < len; i++)
      {
        tagsFind.push(new RegExp(tags[i].tag, 'i'));
        console.log('tag: ' + tags[i].tag + '\n');
      }

      licitationModel.find(
        {"description" : {$in: tagsFind},
         "deliveryDate" : {$gte: currentDate}},
      function (err, licitations)
      {
        if (err) return next(err);
        res.json({licitations: licitations});
      });
    }
    else
    {
      res.json([]);
    }
  });
});

module.exports = router;
