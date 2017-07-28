var express = require('express');
var router = express.Router();
var licitationModel = require('../models/licitation');
var userModel = require('../models/user');
var moment = require('moment');
var nodemailer = require('nodemailer');
var deasync = require('deasync');
var config = require('../cfg/config');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.pass
  }
});

router.route('/notification').post(function (req, res, next)
{
  var currentDateStr = moment().format("YYYY-MM-DD");
  var currentDate = moment(currentDateStr, "YYYY-MM-DD").toDate();
  var usersHandled = 0;
  var sync = false;

  userModel.find(function (err, users)
  {
    if (err) return next(err);

    for (var i = 0; i < users.length; i++)
    {
      var user = users[i];
      var tags = user.tags;
      var tagsFind = [];

      for (var userIndex = 0; userIndex < tags.length; userIndex++)
      {
        tagsFind.push(new RegExp(tags[userIndex].tag, 'i'));
      }

      licitationModel.find(
        {"description" : {$in: tagsFind},
         "deliveryDate" : {$gte: currentDate},
         "notificationHandled" : false},
        function (err, licitations)
        {
          if (err) return next(err);

          if (licitations.length > 0)
          {
            //envia email
            var subject = "Portal de Licitações";
            var message = "";
            message += "<html>";

            for (var licIndex = 0; licIndex < licitations.length; licIndex++)
            {
              var licitation = licitations[licIndex];

              message += "<b>" + licitation.title + "</b><br>";
              message += licitation.description;
              message += "<br><br>";
            }
            message += "</html>";

            var mailOptions =
            {
              from: 'govberto@gmail.com',
              to: user.email,
              subject: subject,
              html: message
            };

            transporter.sendMail(mailOptions, function(error, info)
            {
              if (err) return next(err);

              usersHandled++;
              if (usersHandled == users.length)
              {
                sync = true;
              }
            });
          }
          else
          {
            usersHandled++;
            if (usersHandled == users.length)
            {
              sync = true;
            }
          }
        });
    }

    while(!sync)
    {
      deasync.sleep(100);
    }

    licitationModel.update(
       {"notificationHandled" : false},
       {$set: {"notificationHandled": true}},
       function(err, result)
       {
         if (err) return next(err);
         res.json([]);
       }
    );
  });
});

module.exports = router;
