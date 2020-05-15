/*
Name: Ng Chi Kit Sid:1155108500
Name: Cheng Mang Chun  Sid:1155108467
Name: Yue Ka Long  Sid:1155110560
*/

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  commentID: String,
  locationID: String,
  parent_id: String,
  posted: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
});

module.exports = mongoose.model("Comment", CommentSchema);
