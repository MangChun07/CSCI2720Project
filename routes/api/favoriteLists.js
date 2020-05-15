/*
Name: Ng Chi Kit Sid:1155108500
Name: Cheng Mang Chun  Sid:1155108467
Name: Yue Ka Long  Sid:1155110560
*/

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const FavoriteList = require('../../model/favoriteList');
const Location = require("../../model/location");
const User = require("../../model/user");

//add
router.put('/addfav', (req, res) => {
    Location.findOne({ locationID: req.body.favouriteID}, (err, loc)=>{
        FavoriteList.updateOne(
            {userID: req.session.userID},
            { "$push" :{ favorite: loc.locationID} }, //pushing a _id to the favorite array
            function(err){
                if(err){
                return res.send({
                    error: err,
                    success:false
                })
                }
                else{
                    return res.send({
                        success: true,
                    });
                }
            }
        );
    });
})

//get
//not yet finish
router.get('/getfav', async (req, res) => {
    let data = []
    FavoriteList.findOne({userID: req.session.userID}, (err, fav) => {
        if(fav != null){
            Location.find({locationID: { $in: fav.favorite }}, (err, loc) => {
                return res.send({
                    success: true,
                    data: loc //return a list of location.
                });
            });
        }
        else{
            return res.send({
                success: true,
                data: {}
            });
        }
    });
});

//del: update the list by remove one element.
router.put('/delfav', (req, res) => {
    Location.findOne({ locationID: req.body.favouriteID}, (err, loc)=>{
        FavoriteList.updateOne(
            {userID: req.session.userID},
            { "$pull" :{ favorite: { $in: [ loc.locationID ]} }}, //pulling a _id to the favorite array
            function(err){
                if(err){
                console.log(err);
                return res.send({
                    error: err,
                    success:false
                })
                }
                else{
                    return res.send({
                        success: true
                    });
                }
            }
        );
    });
})

router.post('/checkfav', (req, res) => {
    Location.findOne({ locationID: req.body.favouriteID}, (err, loc)=>{
        FavoriteList.find(
            {userID: req.session.userID,favorite: { $in: [ loc.locationID ]} },
            (err, fav) => {
                if(err){
                console.log(err);
                return res.send({
                    error: err,
                    success:false
                })
                }
                else{
                if(fav.length > 0){
                    return res.send({
                        notFav: false
                    });
                }
                else{
                    return res.send({
                        notFav: true
                    });
                }
                }
        });
    });
})

module.exports = router;