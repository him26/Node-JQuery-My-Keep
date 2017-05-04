var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var conn = require("../config/config.js");
router.use(function(req, res, next) {
    console.log("athentication middleware");
    // var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var token = req.headers.cookie;
        token = token.substr(4);
    console.log(token);
    if (token) {
        jwt.verify(token, conn.secret, function(err, decoded) {
            if (err) {
                res.send({
                    "status": false,
                    "msg": err
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            "status": false,
            "msg": "check your token"
        });
    }
});
module.exports = router;
