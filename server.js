const express = require('express');
const link = express();
const path = require('path');
const db = require('./db');
const port = process.env.PORT || 5000;
var bodyParser = require('body-parser')
link.use(bodyParser.urlencoded({ extended: false }));
link.use(bodyParser.json());
link.use(bodyParser.text());

//Using use function to open the files in public folder
link.use('/',express.static(path.join(__dirname,'/public')));

link.post('/addTodo', (req,res)=>{
   	let task = req.body;
	db.insertDoc(task);
   	res.sendStatus(200);
});

link.get('/data', (req,res)=>{
	db.findAll(function cb(list){
			  res.send(list); 
	   })
})

link.post('/retdata', (req, res)=>{
	let del = req.body;
	db.deleteDoc(del);
	res.sendStatus(200);
})


link.listen(port, () => {
	console.log(`Listening at ${port}`);
	db.connect();
	
});
