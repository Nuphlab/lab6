/**
*
*
*
*
*
*
* Don't Edit this file. If you do, and you break your 
* project, don't go complaining to a TA about it. 
* You only have yourself to blame for this.
*
*
*
*
*
*
*
*/

/**
* Environment Variable Setup
*/

// This allows you to use the .env file in your project. The config() method reads the .env files
// (and any file that ends with .env) and puts all of the variables into the process.env object.
require(`dotenv`).config()

/**
* Module dependencies.
*/

const app = require(`./app`)
const http = require(`http`)

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || `3000`)
app.set(`port`, port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on(`error`, onError)
server.on(`listening`, onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	const port = parseInt(val, 10)

	if (isNaN(port)) {
		// named pipe
		return val
	}

	if (port >= 0) {
		// port number
		return port
	}

	return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== `listen`) {
		throw error
	}

	const bind = typeof port === `string`
		? `Pipe ` + port
		: `Port ` + port

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case `EACCES`:
			console.error(bind + ` requires elevated privileges`)
			process.exit(1)
		case `EADDRINUSE`:
			console.error(bind + ` is already in use`)
			process.exit(1)
		default:
			throw error
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address()
	const bind = typeof addr === `string`
		? `pipe ` + addr
		: `port ` + addr.port

	console.clear()
	console.log(`Listening on ` + bind)
}