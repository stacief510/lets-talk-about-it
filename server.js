const express = require('express');
const app = express();
const pool = require("./db");
// const myRoutes = require('./public/routes');
const bodyParser = require('body-parser');

//app.use(express.json());

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});



app.get('/convos', async(req,res)=>{
	try{
		const allConvos = await pool.query('SELECT * FROM convos');
		res.json(allConvos.rows);
	} catch(err){
		console.error(err.message);
	}
});

app.post('/addConvo', async(req,res)=>{
	try{
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+'T'+time+'.000Z';
		console.log(dateTime)	
		const newConvo= await pool.query("INSERT INTO convos (title, startDate) VALUES ($1,$2)", [req.body.title, dateTime]);
		res.json(newConvo);
	} catch(err){
		console.error(err.message);
	}
})

app.get('/convos/:convoId', async(req,res)=>{
	try{
		const {convoId} = req.params;
		const oneConvo = await pool.query('SELECT * FROM convos WHERE convoId =$1', [convoId]);
		res.json(oneConvo.rows);
	} catch(err){
		console.error(err.message);
	}
});

app.post('/convos/:convoId/addMessage/', async(req,res)=>{
	try{
		const {convoId} = req.params;
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+'T'+time+'.000Z';
		console.log(dateTime)	
		const newConvo= await pool.query("INSERT INTO messages (msgText, msgCreatedDate, msgCreatedTime, convo) VALUES ($1,$2,$3,$4)", [req.body.msgText, dateTime, time,convoId]);
		res.json(newConvo);
	} catch(err){
		console.error(err.message);
	}
})

app.get('/convos/:convoId/messages/', async(req,res)=>{
	try{
		const {convoId} = req.params;
		const allMsgs = await pool.query('SELECT * FROM messages WHERE convo =$1', [convoId]);
		res.json(allMsgs.rows);
	} catch(err){
		console.error(err.message);
	}
});

app.get('/convos/:convoId/messages/:messageId', async(req,res)=>{
	try{
		const oneMessage = await pool.query('SELECT * FROM messages WHERE messageId =$1', [req.params.messageId]);
		res.json(oneMessage.rows);
	} catch(err){
		console.error(err.message);
	}
});

app.post('/convos/:convoId/messages/:messageId/addathought', async(req,res)=>{
	try{
		
	
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+'T'+time+'.000Z';
		console.log(dateTime)	
		const newConvo= await pool.query("INSERT INTO thoughts (thoughtText, thoughtCreatedDate, thoughtCreatedTime, message) VALUES ($1,$2,$3,$4)", [req.body.thoughtText, dateTime, time, req.params.messageId]);
		res.json(newConvo);
	} catch(err){
		console.error(err.message);
	}
})

app.get('/convos/:convoId/messages/:messageId/thoughts', async(req,res)=>{
	try{
		const oneMessage = await pool.query('SELECT * FROM thoughts WHERE message =$1', [req.params.messageId]);
		res.json(oneMessage.rows);
	} catch(err){
		console.error(err.message);
	}
});

app.get('/convos/:convoId/messages/:messageId/thoughts/:thoughtId', async(req,res)=>{
	try{
		const oneMessage = await pool.query('SELECT * FROM thoughts WHERE thoughtId =$1', [req.params.thoughtId]);
		res.json(oneMessage.rows);
	} catch(err){
		console.error(err.message);
	}
});

app.get('/', function(req, res) {
	res.send('Server is working...');
});


//app.use(myRoutes);


app.listen(process.env.PORT || 3001, function() {
	console.log('This server is listening on port 3001')
});