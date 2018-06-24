var mongoose = require('mongoose');
const Ride = require('../models/ride_model');

// POST /retrieve_rides
exports.retrieve_rides = function(req, res, next){
  Ride.find({$and:[
    { pickup_gps: { $geoWithin: { $centerSphere: [req.body.pickup_gps, 300 / 3963.2] } } },
    { dropoff_gps: { $geoWithin: { $centerSphere: [req.body.dropoff_gps, 300 / 3963.2] } } },
    { leave_time: { $gt: new Date().getTime()/1000+(60*60*6) } }
  ]}, null, {sort: {leave_time: 1}}, function(err, rides){
		if(err){return next(err)}
		if(rides.length > 250){
			const lastFew = rides.slice(-250)
			res.json(lastFew)
		}else{
			res.json(rides)
		}
	})
}

// POST /create_ride
exports.create_ride = function(req, res, next){
  var ride = new Ride(req.body);
	ride.save(function(err, savedRide){
		if(err){
      console.log(err)
      res.status(500).send('An error occurred saving this ride')
    }
		console.log("saving this new ride:");
		console.log(savedRide);
    res.json({
      message: "Ride was successfully saved!",
      ride: savedRide
    })
	});
}
