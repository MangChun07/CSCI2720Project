const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// var dbUri = 'mongodb+srv://JackyChun:qwer1234@cluster0-wt6nl.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true';
var dbUri = "mongodb+srv://jackyNg:jackyng@cluster0-7hx7m.gcp.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});

let User = require('../../model/user.model');

router.post('/signup', (req, res) => {
  var data = req.body;
  console.log(data);
  const saltRounds = 10;
  // hash the password
  bcrypt.hash(data.password, saltRounds).then(hash => {
    data.password = hash;
    User.find({}, 'userID').sort({userID: -1}).limit(1).exec(function(err, maxIdUser) {
      if (err) res.send(err);
      else{
        var maxId = 0;
        if (maxIdUser.length == 1) {
          maxId = maxIdUser[0].userID;
        }
        var user = new User({
          userID: maxId + 1,
          username: data.username,
          password: data.password
        });
        user.save(function(err){
          if (err) {
            res.send("usernameUsed");
          }
          else {
            res.send("signup done");
          }
        });
      }
    });
  });
});

router.post("/login", (req, res)=>{
  var data = req.body;
  console.log(req.body);
  User.findOne({ username: data.username }, { password: 1 }, (err, user) => {
    if (user == null) res.send("Username Not Found");
    else{
      bcrypt.compare(data.password, user.password, (err, result) => {
        if (result == true) {
          res.send("Login Success");
        }
        else res.send("Password Not Correct");
      });
    }
  });
});




module.exports = router;
