var express = require('express'),
    router = express.Router();
router.get('/session', function(req, res) {
    // console.log("session ....", req.session);
  
    if (req.headers.cookie == undefined) {
        console.log("no user");
        res.send({
            "status": false,
            "message": "no user",
            "session": false
        });
    } else {
        console.log("user exist");
        res.send({
            "status": true,
            "message": "user exist",
            "session": true
        });
    }
});
module.exports = router;
