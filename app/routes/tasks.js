const express = require(`express`)
const router = express.Router()
const Task = require(`../models/Task`)
const { stringify } = require("querystring")

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
	//console.log(req.body.UserId)
	
	try{
		const newTask = new Task({
			UserId: data.UserId,
			Text: data.Text,
			Done: data.Done,
			Date: data.Date,
		})
		let task = await newTask.save()
		res.status(201).send(task)
	}catch(e){
		console.error
		res.status(500)
	}
})

router.get('/', async (req, res) => {
	//var tasks = [{}]
	Task.find({ UserId: '123'}, function (err, docs) { 
		if (err){ 
			console.log(err); 
		} 
		else{ 
			//console.log("First function call : ", docs); 
			//tasks = docs
			//console.log(tasks)
			res.send(docs)
		} 
	}); 
})

router.put('/:id', async (req, res) => {
	//const id 
	let updatedTask = Task.findByIdAndUpdate(id, { Text: req.body.Text},
		function (err, docs) { 
			if (err){ 
				console.log(err) 
			} 
			else{ 
				console.log("Updated User : ", docs); 
			} 
})

	//updatedTask.UserId = req.body.UserId
	//updatedTask.Text = req.body.Text
	//updatedTask.Done = req.body.Done
	//updatedTask.Date = req.body.Date

	//res.send(updatedTask)
	res.send("hit the put endpoint")
})
router.delete('/:id', async (req, res) => {
	let task = Task.findByIdAndDelete(req.body.id)
	//Task.delete(Task.findById(req.body.id))
	//res.send(task)
	res.send("hit the get delete endpoint")
})

module.exports = router