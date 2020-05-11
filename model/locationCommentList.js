var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LocationCommentListSchema = new Schema({
  lcoationID: String,
  commentList: [mongoose.ObjectId],
});

module.exports = mongoose.model(
  "LocationCommentList",
  LocationCommentListSchema
);
