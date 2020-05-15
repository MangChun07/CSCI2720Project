/*
Name: Ng Chi Kit Sid:1155108500
Name: Cheng Mang Chun  Sid:1155108467
Name: Yue Ka Long  Sid:1155110560
*/

const express = require('express');
const router = express.Router();

const Location = require('../../model/location');

router.post("/loc/:locID", (req, res) => {
  Location.findOne({locationID: req.body.locID}, (err, loc)=>{
    if (err) res.send({success: false});
    else {
      res.send({
        success: true,
        data: loc,
      });
    }
  });
});

module.exports = router;
