var express = require('express'),
router = express.Router(),
userprofile = require('../models/userSchema.js');
router.get('/', function(req,res){
  try {
    var userid = req.decoded.id;
      console.log(userid);
      userprofile.getRegisterUserProfile(userid,function(err,result){
        console.log();
        if(!err)
        {
          var UserProfile = {
            fanme:result.fname,
            lanme:result.lname,
            email:result.email
          }
          res.send({"status":true,"message":"Get Profile","userprofile":UserProfile});
        }
        else
        {
          res.send({"status":false,"message":"use authentic profile"});
        }
      });
  } catch (e) {
    res.send({"status":false,"message":"server error"});
  }
});
module.exports = router;
