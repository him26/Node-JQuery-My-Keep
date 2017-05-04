var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todocards = require('../../models/cardsSchema.js');

router.post('/:id', function(req, res) {
  var updatedata = {
    cardid:req.params.id,
    tittleAndDes:req.body
  }
  todocards.updateCardsData(updatedata, function(err, todos) {
    if(!err)
    {
      res.send({"status": true,"message": todos});
    }
    else
    {
      res.send({"status": false,"message": err});
    }
  })
  // console.log(req.body);
  //
  //   todo.findByIdAndUpdate(req.params.id, req.body, function(err, todos) {
  //       try {
  //           if (err) throw err;
  //           res.send(todos);
  //       } catch (e) {
  //           console.log(e);
  //           res.send({
  //               status: false,
  //               message: "mongoose issue"
  //           });
  //       }
  //   });
});

module.exports = router;
