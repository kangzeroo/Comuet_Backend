const bodyParser = require('body-parser')
// routes
const Test = require('./routes/test_routes')
const Rides = require('./routes/ride_routes')


// bodyParser attempts to parse any request into JSON format
const json_encoding = bodyParser.json({type:'*/*'})
// bodyParser attempts to parse any request into GraphQL format
// const graphql_encoding = bodyParser.text({ type: 'application/graphql' })

module.exports = function(app){

	// routes
	app.get('/test', json_encoding, Test.test)
	app.post('/retrieve_rides', json_encoding, Rides.retrieve_rides)
	app.post('/create_ride', json_encoding, Rides.create_ride)

}
