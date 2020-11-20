 /*
 This is a file you probably should not edit.

 This code sets up a connection to the Azure Database 
 you should have created in lab 4B when you published 
 your application to Azure. 
 
 The database holds user information we will use for 
 authentication. 

 You will have to set up a similar connection to your
 MongoDB database in the mongoose.js file. 

 */

const { Connection } = require(`tedious`)

const mssqldb = new Connection({
	authentication: {
		options: {
            // These variables have to be defined in your .env file
			userName: process.env.AZURE_DB_ADMIN_USERNAME,
			password: process.env.AZURE_DB_ADMIN_PASSWORD,
		},
		type: "default"
	},
	server: process.env.AZURE_SERVER_NAME,
	options: {
		database: process.env.AZURE_DB_NAME,
		encrypt: true
	}
})
// If connected to Azure, a message will be displayed in console
mssqldb.on(`connect`, err => {
	if (err) console.error(err.message)
	else console.log(`User Database Connected`)
})

mssqldb.on(`error`, err => {
	if (err) console.error(err.message)
})

module.exports = mssqldb