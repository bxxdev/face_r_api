const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');


const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Bxx2post1!',
    database : 'face_r'
  }
});

// db.select('*').from('users').then(data=>{
// 	console.log(data);
// });
// console.log(postgres.select('*').from('users'));


const app = express();

// const database ={
// 	users: [
// 		{
// 			id: '123',
// 			name: 'John',
// 			email:'john@gmail.com',
// 			password:'a1',
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id: '124',
// 			name: 'Sally',
// 			email:'sally@gmail.com',
// 			password:'a2',
// 			entries: 0,
// 			joined: new Date()
// 		}
// 	],
// 	login:[{
// 		id:'987',
// 		hash:'',
// 		email:'john@gmail.com'
// 	}]
// }


app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res)=>{
	res.send(database.users);
	// res.send('this is working');
} )



app.post('/signin',signin.handleSignin(db,bcrypt))
// app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

// 	(req, res)=>{

// 	db.select('email', 'hash').from('login')
// 		.where('email','=',req.body.email)
// 		.then(data =>{
// 			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
// 			if (isValid){
// 				return db.select('*').from('users')
// 				.where('email','=', req.body.email)
// 				.then(user=>{
// 					// console.log(user)
// 					res.json(user[0]);
// 				})
// 				.catch(err => res.status(400).json('Unable to get user'))
// 			}else{
// 				res.status(400).json('Wrong credentials')
// 			}
// 		})
// 		.catch(err => res.status(400).json('Wrong credentials'))

// // 	// Load hash from your password DB.
// // bcrypt.compare("a123", '$2a$10$9ewdl4fUGMerJo5EMu.cduCFC4h5TFsG4f4LsVJK9f9dJOSKkkPzW'
// // , function(err, res) {
// // 	console.log('First guess', res);
// //     // res == true
// // });
// // bcrypt.compare("veggies", '$2a$10$9ewdl4fUGMerJo5EMu.cduCFC4h5TFsG4f4LsVJK9f9dJOSKkkPzW', function(err, res) {
// //     console.log('second guess', res);
// //     // res = false
// // });


// 	// if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
// 	// 	res.json(database.users[0]);
// 	// 	// res.json('success');
// 	// }
// 	// else{
// 	// 	res.status(400).json('error logging in');
// 	// }
// 	// res.json('signin');
// })



app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)})
// 	(req, res)=>{
// 	const {email,name,password}=req.body;
// 	// const id ={
// 	// 	id:''
// 	// }

// 	const hash= bcrypt.hashSync(password);
// 	// bcrypt.hash(password, null, null, function(err, hash) {
// 	// 	console.log(hash);
//     // Store hash in your password DB.
// // });
//  	db.transaction(trx=>{
//  		trx.insert({
//  			hash:hash,
//  			email:email
//  		})
//  		.into('login')
//  		.returning('email')
//  		.then(loginEmail=>{
//  			return trx('users')
// 		 	.returning('*')
// 		 	.insert({
// 	 		email:loginEmail[0],
// 	 		name: name,
// 			joined: new Date()
// 		 	})
// 		 	.then(user=>{
// 		 		res.json(user[0]);
// 			 	})	
//  		})
//  		.then(trx.commit)
//  		.catch(trx.rollback)
//  		})
//  	// 	.then(function(resp) {
//   // 			console.log('Transaction complete.');
// 		// })
// 		// .catch(function(err) {
//   // 			console.error(err);
//   // 		})

// 	 	.catch(err=>res.status(400).json('Unable to register'))
//  	// .then(console.log)

// 	// database.users.push({
// 	// 		id: '125',
// 	// 		name: name,
// 	// 		email:email,
// 	// 		// password:password,
// 	// 		entries: 0,
// 	// 		joined: new Date()
// 	// })
// 	// res.json(database.users[database.users.length-1]);
// })


app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,db)})


//  (req, res)=>{
// 	const {id} = req.params;
// 	// let found = false;

// db.select('*').from('users')
// 	.where({id})
// 	.then(user=>{
// 		if (user.length){
// 			res.json(user[0])
// 		}
// 		else{
// 			res.status(400).json('Not found')
// 		}
// 		})
// 	.catch(err=>res.status(400).json('Error getting user'))
	
// 	// console.log(user[0]);


// 	// database.users.forEach(users=>{
// 	// 	if(users.id === id){
// 	// 		found=true;
// 	// 		return res.json(users);
// 	// 	}
// 	// 	// else{
// 	// 	// 	res.status(404).json('User not found');
// 	// 	})
// 	// if (!found) {
// 	// 	res.status(404).json('User not found');
// 	// }
// 	})



app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

// 	(req, res)=>{
// 	const {id} = req.body;
	
//   db('users').where('id', '=', id)
// 	.increment('entries',1)
// 	.returning('entries')
// 	.then(entries=>{
// 		res.json(entries[0]); 
// 	})
// 	.catch(err=>res.status(400).json('Error getting entries'))
// 	// let found = false;
// 	// database.users.forEach(user=>{
// 	// 	if(user.id === id){
// 	// 		found=true;
// 	// 		user.entries ++;
// 	// 		return res.json(user.entries);
// 	// 	}
// 	// 	// else{
// 	// 	// 	res.status(404).json('User not found');
// 	// 	})
// 	// if (!found) {
// 	// 	res.status(404).json('User not found');
// 	// }
// })




// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });










app.listen(3000, ()=>{
	console.log('app is running on port 3000');
});


/*

ROUTES localhost:3000 (root: localhost:3000/; signin: localhost:3000/signin; etc. )
/res --> this is ..
/signin --> POST		response: success/fail  (using POST: to make able that for ex the password to be inside a html body eventual transmited over https)
/register --> POST		return user
/profile/:userId -->GET  to get the user info and return the user  		(in home screen to access the user profile)
/image --> PUT  to keep the count each time when a image is uploaded in home screen for face recognition    return user updated


 */