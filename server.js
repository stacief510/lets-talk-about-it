const express = require('express');
const app = express();
const pool = require("./db");
// const myRoutes = require('./public/routes');
const bodyParser = require('body-parser');

// app.use(express.json());

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

app.get('/', (req, res)=>{	
	res.sendFile('/public/index.html');
});

app.get('/convos', async(req,res)=>{
	try{
		const allConvos = await pool.query('SELECT * FROM convos');
		res.json(allConvos.rows);
	} catch(err){
		console.error(err.message);
	}
});
app.get('/convos/:convoId', async(req,res)=>{
	try{
		const {convoId} = req.params;
		const oneConvo = await pool.query('SELECT * FROM convos WHERE convoId =$1', [convoId]);
		res.json(oneConvo.rows);
	} catch(err){
		console.error(err.message);
	}
});

app.get('/convos/:convoId/messages/', async(req,res)=>{
	try{
		const {convoId} = req.params;
		const allMsgs = await pool.query('SELECT * FROM messages WHERE convo =$1', [convoId]);
		res.json(allMsgs.rows);
	} catch(err){
		console.error(err.message);
	}
});
app.get('/convos/:convoId/messages/:msgId', async(req,res)=>{
	try{
		const {convoId} = req.params.convoId;
		const {msgId} = req.params.msgId;
		const oneMsg = await pool.query('SELECT * FROM messages WHERE messageId = $1', [msgId]);
		send.json(oneMsg);
		// res.json(oneMsg.rows);
	} catch(err){
		console.error(err.message);
	}
});


app.get('/test', function(req, res) {
	res.send('Server is working...');
});


//app.use(myRoutes);


app.listen(process.env.PORT || 3001, function() {
	console.log('This server is listening on port 3001')
});