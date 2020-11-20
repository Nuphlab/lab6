/*
 *
 * Make sure you don't change anything
 * In this file. There are some notes
 * to help you understand what is happening
 * but you do not need to read them all to
 * complete the lab. 
 *
 */

/*

In node, when you export a method like:

```
exports.getUserFromAzure = // ....
```

you can import it with the following syntax:

```
const { getUserFromAzure } = require(`path/to/this/file`)
```

*/

const { Request, TYPES } = require(`tedious`)
const mssqldb = require(`../mssqldb`)

/**
 * Grabs a user asynchronously from a SQL Database hosted on Azure
 * @param email - The email of the user to get (case-insensitive)
 * @returns - An object representation of the user's row in the database
 */
exports.getUserFromAzure = email =>

	// This is how we turn synchronous code into a promise. Instead of using callbacks like a beta, we want
	// to use async/await like a chad. That's why we return a promise from this method. In the callback of the
	// actual process that we want to do, we'll use resolve() to return the value. If there's an error, we can
	// call reject() to pass that error to the catch{} block of the try/catch when we use this method.
	new Promise((resolve, reject) => {

		// This is where the actual request is created. Notice the @ symbol. That's how we avoid SQL injection
		const request = new Request(
			`SELECT * FROM AspNetUsers WHERE NormalizedEmail = @normalizedEmail`,
			err => {
				if (err) {
					console.error(err.message)
					reject(`There was a problem getting the user.`)
				}
			}
		)

		// Here, we replace the @normalizedEmail in the SQL query above with the actual
		// normalized value of the email that comes in via the function's parameter
		request.addParameter(`normalizedEmail`, TYPES.VarChar, email.toUpperCase())

		// Here we initialize the final array of rows we get back from the database.
		// In this case, we should really only expect one row, since we only want
		// one user, but because of how the request returns values, we need to
		// temporarily store them in an array, and then just return the first item
		// in the array.
		const rows = []

		// Here we set up an event handler, since that's how tedious is set up to return data
		request.on(`row`, columns => {

			// We're going to iterate through the columns array that's returned with each row and
			// create a JavaScript object from it. Then we'll push that final object into the rows
			// array that we created earlier.
			rows.push(

				// Reducers take an array and turn them into some other type. Here we're turning our
				// array of columns into a javascript object where the key is the column name and the
				// value is the value of the column in the current row.
				columns.reduce(

					// The first parameter of the reduce() method takes a function which acts on each
					// item in the columns array. The function given should take at least 2 parameters:
					// The previous value of the object we're trying to create, and the current item in
					// the array. This method should then return the new value of the object.
					(rowAsJSObject, column) => (
						{
							...rowAsJSObject,
							[column.metadata.colName]: column.value
						}
					),

					// by the way, arrow functions that look like this:
					// (fnParameters) => ({ })
					// are equivalent to this:
					// (fnParameters) => { return { } }
					// yay syntactic sugar!!

					// The second parameter in the reduce() function is the inital value of the object
					// we're trying to create. In our case, it should be an empty object.
					{}
				)
			)
		})

		// Here we say what to do when the request finishes. This event is emitted AFTER
		// the callback of the Request constructor that we call on line 55, and AFTER all
		// of the rows have been processed. So we know when we return the first item in
		// the rows array, it'll be the user we want.
		request.on(`requestCompleted`, () => {
			// As a reminder, we don't know when this event will fire. It may take a long time,
			// or a short time! that's why we made this method return a new Promise object. In
			// another file, when we call this method, it'll look something like this:

			/*

			const user = await getUserFromAzure(user.Email)

			*/

			// Because we use the await keyword, we're setting that const user to whatever we
			// pass into this resolve() method. The reject() method is where we send errors,
			// and in that file, we should wrap the await line in a try/catch so that the
			// reject() method can properly pass the error into the catch block of that statement.

			resolve(rows[0])
		})

		// After we tell the request what to do during those two events, we can actually
		// make the request. We've imported the connection object from the db-setup.js file
		// so that we can call execSql() on the request, and voila! that's how we check our
		// Azure SQL database for a user!
		mssqldb.execSql(request)
	})

// This method is a middleware that I made that just checks if there's a `user` object
// on the `req` object. Passport creates the user object when you log in, so if you
// aren't logged in, then it'll just send a 401 (Unauthorized) to your client.
exports.authenticate = (req, res, next) => {
	if (req.user) next()
	else res.sendStatus(401)
}