
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todocards = require('../../models/cardsSchema.js');
/* GET /todos listing. */
router.get('/', function(req, res) {
  try {
    console.log("nvldsalvlsvnlsnvdlds");
          var userid = req.decoded.id;
          console.log(userid);
          todocards.readCardsData(userid,function(err, todos) {
            if (!err) {
              res.send({"status": true,"message": todos});
            } else {
              res.send({"status": false,"message": "Your cards data is not saved"});
            }
          });
  } catch (e) {
      res.send({
          "status": false,
          "message": "server error"
      });
  }



    // todo.find({
    //     "user_id": req.decoded
    // }, "title description reminder", function(err, todos) {
    //     if (err) return next(err);
    //     res.send(todos);
    //
    // });
});
// /* GET /todos/id */
// router.get('/:id', function(req, res) {
//     todo.findById(req.params.id, function(err, todos) {
//         if (err) return next(err);
//         res.send(todos);
//     });
// });

module.exports = router;
