var express = require('express'),
router = express.Router();

console.log("I am in index.js");
router.use(require('./signup'));
router.use(require('./login'));
// router.use(require('./authenticate'));
router.use(require('./session'));
router.use(require('./logout'));

router.use("/readProfile",require('./authenticate'),require('./userprofile'));
router.use("/createcard", require('./authenticate'), require("./cards/createcard"));
router.use("/deletecard", require('./authenticate'), require("./cards/deletecard"));
router.use("/updatecard", require('./authenticate'), require("./cards/updatecard"));
router.use("/readcard", require('./authenticate'), require("./cards/readcard"));


module.exports = router;
