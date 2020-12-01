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
	Task.find({ UserId: '123'}, function (err, docs) { 
		if (err){ 
			console.log(err); 
		} 
		else{ 
			res.send(docs)
		} 
	}); 
})

router.put('/:id', async (req, res) => {
	let done = false
	const id = req.params.id
	let task = await Task.findById(id, function (err, docs) { 
		if (err){ 
			console.log(err); 
		} 
		else{ 
			console.log("Result : ", docs.Done);
			done = docs.Done
		} 
	}); 
	done = !done

	let updatedTask = await Task.findByIdAndUpdate({_id: id}, { Done: done},
		function (err, docs) { 
			if (err){ 
				console.log(err) 
			} 
			else{ 
				console.log("Updated User : ", docs); 
			} 
})
	res.send("hit the put endpoint")
})

router.delete('/:id', async (req, res) => {
	let id = req.params.id
	let task = Task.findByIdAndDelete(id, function (err, docs) { 
		if (err){ 
			console.log(err) 
		} 
		else{ 
			console.log("Deleted : ", docs); 
		} 
	}); 
	res.send("hit the get delete endpoint")
})

module.exports = router