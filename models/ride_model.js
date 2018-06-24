// Import dependencies on Mongoose
var mongoose = require('mongoose')
var uuid = require('uuid')
var Ride = mongoose.Schema;

// Create the Rental post Schema
var RideSchema = new mongoose.Schema({
	ride_id: String,
	pickup_address: String,
	dropoff_address: String,
	driver_name: String,
	driver_id: String,
	driver_phone: String,
	price: Number,
	leave_time: Number,
	description: String,
	pickup_gps: {
		type: [Number],
		index: '2d'
	},
	dropoff_gps: {
		type: [Number],
		index: '2d'
	},
	created_at: Date
});

RideSchema.pre('save', function(next){
	var currentDate = new Date();
	var ride_id = uuid.v4()
	this.created_at = currentDate;
	this.ride_id = ride_id
	next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
RideSchema.index({pickup_gps: '2dsphere'});
RideSchema.index({dropoff_gps: '2dsphere'});

var Ride = mongoose.model('Ride', RideSchema);

module.exports = Ride;
