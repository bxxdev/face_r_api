const handleRegister=(req,res,db,bcrypt)=>{
	const {email,name,password}=req.body;
	// const id ={
	// 	id:''
	// }

	if(!email || !name || !password){
		return res.status(400).json('Incorrect form submission')
	}

	const hash= bcrypt.hashSync(password);
	// bcrypt.hash(password, null, null, function(err, hash) {
	// 	console.log(hash);
    // Store hash in your password DB.
// });
 	db.transaction(trx=>{
 		trx.insert({
 			hash:hash,
 			email:email
 		})
 		.into('login')
 		.returning('email')
 		.then(loginEmail=>{
 			return trx('users')
		 	.returning('*')
		 	.insert({
	 		email:loginEmail[0],
	 		name: name,
			joined: new Date()
		 	})
		 	.then(user=>{
		 		res.json(user[0]);
			 	})	
 		})
 		.then(trx.commit)
 		.catch(trx.rollback)
 		})
 	// 	.then(function(resp) {
  // 			console.log('Transaction complete.');
		// })
		// .catch(function(err) {
  // 			console.error(err);
  // 		})

	 	.catch(err=>res.status(400).json('Unable to register'))
 	// .then(console.log)

	// database.users.push({
	// 		id: '125',
	// 		name: name,
	// 		email:email,
	// 		// password:password,
	// 		entries: 0,
	// 		joined: new Date()
	// })
	// res.json(database.users[database.users.length-1]);
}


module.exports={
	handleRegister:handleRegister
}