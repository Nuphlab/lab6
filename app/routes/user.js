/**
 * This file is an example of a endpoint.
 * GET: Returns the current user object after 
 * being authenticated. 
 */
const router = require(`express`).Router()

router.get(`/`, async (req, res) => {
	try {
		res.status(200).send(req.user)
	} catch (error) {
		console.error(error)
		res.status(500).send(`There was a problem getting the user.`)
	}
})

module.exports = router
