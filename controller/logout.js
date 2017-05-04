var express = require('express'),
router = express.Router();

router.get('/logout',function(req,res){
  res.clearCookie('key');
  res.send({"status":true,"session":false});
});
module.exports = router;
