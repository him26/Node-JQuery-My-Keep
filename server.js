var express = require("express"),
    app = express(),
bodyParser = require("body-parser"),
connection = require("./config/config.js");
var validator = require("express-validator");
var cors = require('cors');
var cookieparser = require("cookie-parser");
// console.log(connection.secret);
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(validator());
app.use(cookieparser());
app.use(express.static('./public'));
app.use(require('./controller'));

var port = process.env.PORT || 8081;
app.listen(port, function() {
    connection.mongoconn();
    console.log("listning from the port" + port);
});
