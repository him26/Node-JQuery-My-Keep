var mongoose = require('mongoose');
var validators = require('mongoose-validators');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CardsSchema = new Schema({
  userid: {
  ref: "user",
  type: ObjectId
},
    title: String,
    description: String,
    // width:Number,
    // height:Number,
    completed: Boolean,
    created_at: {
       type: Date,
        default: Date.now
      },
    updated_at: {
        type: Date,
        default: Date.now
    }
},{collection:'TodoCards'});
CardsSchema.statics.saveCardsData = function(data, cb) {
		var userObj = new this(data);
    userObj.save(cb);
};

CardsSchema.statics.deleteCardsData = function(deldata, cb) {

  this.find({_id:deldata._id,}).remove(cb);

};

CardsSchema.statics.updateCardsData = function(updata, cb) {
this.findByIdAndUpdate(updata.cardid, updata.tittleAndDes,cb);
};

CardsSchema.statics.readCardsData = function(readata, cb) {
  console.log(readata);
this.find(readata,cb);
};
CardsSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

var TodoCards = mongoose.model('TodoCards', CardsSchema);
module.exports = TodoCards;
////

// TodoSchema.set('toJSON', {
//     transform: function(doc, ret, options) {
//         ret.t_id = ret._id;
//         delete ret._id;
//         return ret;
//     }
// });
/////////////////////
// {
//     toObject: {
//         virtuals: true
//     },
//     toJSON: {
//         virtuals: true
//     }
//   }
//////////////
// user_id: {
//     ref: "user",
//     type: ObjectId
// },
