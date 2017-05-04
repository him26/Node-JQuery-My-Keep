var express = require('express'),
    router = express.Router();
// var errors = require("../config");
var error = require("../config");
var RegisterUser = require('../models/userSchema.js');


console.log(error);
router.post('/signup', function(req, res) {
  console.log("signup data",req.body);
  var result = {};
 result.status = false;
try {
  console.log("sbvbksbklklvbvslkvlkvlvsllv");
  console.log(error.validationSchema.registration);
  req.check(error.validationSchema.registration);
  req.getValidationResult().then(function(isValid) {
    console.log("kgkgkk");
          try {
            console.log("try1");
              if (!isValid.isEmpty()) {
                console.log("bkdszbkvbksvsdbkvbskvb;s");
                  var errors = req.validationErrors(); // isValid = isValid.useFirstErrorOnly();
                  throw errors[0].msg;
              }
              RegisterUser.saveRegisterUserInfo(req.body, function(err, result) {
                  if (!err) {
                      if (!result) {
                          res.send({"status": true,"msg": "user email id already exist!"});
                      } else {
                          res.send({"status": true,"msg": "data is saved!"});
                      }
                  } else {
                      if (err == undefined) {
                          res.send({"status": false,"msg": "data is not saved"});
                      } else {
                          var validationErrors = [];
                          var errormsg = JSON.stringify(err);
                          var convertmsg = JSON.parse(errormsg).errors;
                          for (var key in convertmsg) {
                              validationErrors.push(convertmsg[key].message);
                          }
                          res.send({"status": false,"msg": validationErrors});
                      }
                  }
              });
          }catch (e) {

            console.log(e);
                if (!error.checkSystemErrors(e)) {
                    result.status = false;
                    result.msg = e;
                }
                res.send(result);
                return;
}
      });
    } catch (e) {
      console.log(e);
          res.send({"status": false,"msg":"server error"});
      }
  });
module.exports = router;
