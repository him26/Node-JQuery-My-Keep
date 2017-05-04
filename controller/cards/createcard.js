var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todocards = require('../../models/cardsSchema.js');
/* POST /todos */
router.post('/', function(req, res) {
    try {   var userid = req.decoded.id;
            var data = {
              userid:userid,
              title:req.body.title,
              description:req.body.description,
              width:req.body.width,
              height:req.body.height
            }
            todocards.saveCardsData(data,function(err, todos) {
              if (!err) {
                res.send({"status": true,"message": "Your cards data is saved"});
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
});
module.exports = router;
