var mongoose = require('mongoose');
var validators = require('mongoose-validators');
var bcrypt = require('bcrypt');

SALT_WORK_FACTOR = 5;
var Schema = mongoose.Schema;
var registerUserSchema = Schema({
    firstname: {
        type: String,
        required: true,
				minlength: 5,
				maxlength: 128,
				validate:validators.isAlpha()
    },
    lastname: {
        type: String,
        required: true,
				validate:validators.isAlpha()
    },
    email: {
        type: String,
        required: true,
        unique: true,
				minlength: 8,
				maxlength: 128,
				validate: validators.isEmail()
    },
    password: {
        type: String,
        required: true,
				minlength: 8,
				maxlength: 20
    },
    mobileno: {
        type: Number,
        required: true,
        unique: true,
				min: 10
    }
}, {collection: "RegisterUser"});
registerUserSchema.statics.saveRegisterUserInfo = function(data, cb) {
		var self = this;
    this.findOne({email: data.email}, function(error, exist) {
        if (exist) {
             cb(null,false);
        } else {
						var userObj = new self(data);
            userObj.save(cb);
        }
    });
};
registerUserSchema.statics.checkLoginAuthentication = function(logindata, cb) {
    RegisterUser.findOne({ email: logindata.email}, cb);
};
registerUserSchema.statics.getRegisterUserProfile = function(userid, cb) {
  var self = this;
  this.findById(userid,cb);
};
registerUserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next(); // only hash the password if it has been modified (or is new)
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) { // generate a salt
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) { // hash the password using our new salt
            if (err) return next(err);
            user.password = hash; // override the cleartext password with the hashed one
            next();
        });
    });
});
registerUserSchema.statics.comparePassword = function(datapassword, cb) {
    bcrypt.compare(datapassword.givenpass,datapassword.extractedpass,cb);
  };

registerUserSchema.virtual('userid').get(function() {
  console.log("virtuals are",this._id);
    return this._id.toHexString();
});

registerUserSchema.set('toJSON', {
    virtuals: true
});
var RegisterUser = mongoose.model('RegisterUser', registerUserSchema);
module.exports = RegisterUser;
