const express = require(`express`)
const router = express.Router()
const Task = require(`../models/Task`)

/**
 * GET: Returns one task with the task's id specified in the path
 */
router.get(`/:id`, async (req, res) => {
	try {
		const task = await Task.findById(req.params.id)
		if (!task) res.status(404).send(`Task with ID ${req.params.id} does not exist.`)
		else res.status(200).send(task)
	} catch (error) {
		console.error(error)
		res.status(500).send(`Something went wrong.`)
	}
})

// TODO: Write 4 more handlers for create, read, update, and delete

router.post('/', async (req, res) => {
	//const task = new Task(req.body)
	var data = req.body
	try{
		const newTask = new Task({
			UserId: data.UserId,
			Text: data.Text,
			Done: data.Done,
			Date: data.Date,
		})
		await newTask.save()
		res.send(newTask)
	}catch(e){
		console.error
		res.status(500)
	}
})
router.get('/', async (req, res) => {
	let tasks = Task.findById(req.body.UserId)
	res.send(tasks)
})
router.put('/:id', async (req, res) => {
	let updatedTask = Task.findById(req.params.id)
	updatedTask.UserId = req.body.UserId
	updatedTask.Text = req.body.Text
	updatedTask.Done = req.body.Done
	updatedTask.Date = req.body.Date

	res.send(updatedTask)
})
router.delete('/:id', async (req, res) => {
	let task = Task.findById(req.body.id)
	Task.delete(Task.findById(req.body.id))
	res.send(task)
})

module.exports = router