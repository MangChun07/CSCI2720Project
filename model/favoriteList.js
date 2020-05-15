/*
Name: Ng Chi Kit Sid:1155108500
Name: Cheng Mang Chun  Sid:1155108467
Name: Yue Ka Long  Sid:1155110560
*/

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FavoriteListSchema = new Schema({
  userID: {type: Number, required: true, unique: true},
  favorite: [String]
});

module.exports = mongoose.model("FavoriteList", FavoriteListSchema);
