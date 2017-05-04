var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todocards = require('../../models/cardsSchema.js');
router.delete('/:id', function(req, res) {
    try {

            var deleteddata = {
                // userid:req.decoded.id,
                _id:req.params.id
            };
            console.log(req.params.id);
            console.log(deleteddata);
            todocards.deleteCardsData(deleteddata,function(err, todos) {
              if (!err) {
                res.send({"status": true,"message": todos});
              } else {
                res.send({"status": false,"message": err});
              }
            });
    } catch (e) {
        res.send({"status": false,"message": "server error"});
    }
});
module.exports = router;
/*
try {
console.log(req.decoded);
   var user_id = req.decoded;

   todo.find({
       _id: req.params.id,
       user_id: user_id
   }).remove(function(err, todos) {
       if (err) throw err;
       if (todos.result.n === 0) {
           res.send({
               "status": false,
               "message": "not deleted"
           });
       } else {
           res.send({
               "status": true,
               "message": "suucess deleted"
           });
       }
   });
} catch (e) {
   res.send({
       "status": false,
       "message": "not deleted"
   });
}
*/
