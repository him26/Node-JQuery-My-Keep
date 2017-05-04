var express = require('express'),
    router = express.Router(),
    RegisterUser = require('../models/userSchema.js');
var conn = require("../config/config.js");
var error = require("../config");
var jwt = require('jsonwebtoken');
var result = {};
result.status = false;
router.post('/login', function(req, res) {
try
{
      req.check(error.validationSchema.login);
      req.getValidationResult().then(function(isValid) {
      try
      {
          if (!isValid.isEmpty())
          {
            var errors = req.validationErrors(); // isValid = isValid.useFirstErrorOnly();
            throw errors[0].msg;
          }
          RegisterUser.checkLoginAuthentication(req.body, function(err, user) {
          if (!err)
          {
            if (user != null)
            {
                var datapass = {
                    givenpass: req.body.password,
                    extractedpass: user.password
                };
                RegisterUser.comparePassword(datapass, function(err, result) {
                    if (!err)
                    {
                        if (result)
                        {
                            var token = jwt.sign({id: user.userid}, conn.secret, {expiresIn: 86400 // expires in 24 hours
                            });
                            res.cookie("key",token);
                            res.send({"status": true,"msg": "password matched","token": token});
                        } else
                        {
                            res.send({"status": false,"msg": "password unmatched"});
                        }
                    }
                    else
                    {
                        res.send({"status": false,"msg": "comparison error" + err});
                    }
                });
            }
            else
            {
              res.send({"status": false,"msg": "email id invalid"});
            }
        }
        else
        {
            res.send({"status": false,"msg": "email check error"});
        }
    });
  }
  catch (e) {
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
    res.send({
        "status": false,
        "msg": "server error"
    });
}
});
module.exports = router;
