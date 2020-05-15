/*
Name: Ng Chi Kit Sid:1155108500
Name: Cheng Mang Chun  Sid:1155108467
Name: Yue Ka Long  Sid:1155110560
*/

var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var LocationSchema = new Schema({
  locationID: String,
  latitude: SchemaTypes.Double,
  longitude: SchemaTypes.Double,
  locationName: { type: String, required: true },
  photo: String,
  address: [{ type: String }],
  phoneNum: Number,
  rating: Number,
});

module.exports = mongoose.model("Location", LocationSchema);
