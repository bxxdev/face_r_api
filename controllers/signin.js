const handleSignin=(db, bcrypt)=>(req,res)=>{

	const {email,password} = req.body;

		if(!email || !password){
		return res.status(400).json('Incorrect form submission')
	}

	db.select('email', 'hash').from('login')
		.where('email','=',email)
		.then(data =>{
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid){
				return db.select('*').from('users')
				.where('email','=', email)
				.then(user=>{
					// console.log(user)
					res.json(user[0]);
				})
				.catch(err => res.status(400).json('Unable to get user'))
			}else{
				res.status(400).json('Wrong credentials')
			}
		})
		.catch(err => res.status(400).json('Wrong credentials'))

// 	// Load hash from your password DB.
// bcrypt.compare("a123", '$2a$10$9ewdl4fUGMerJo5EMu.cduCFC4h5TFsG4f4LsVJK9f9dJOSKkkPzW'
// , function(err, res) {
// 	console.log('First guess', res);
//     // res == true
// });
// bcrypt.compare("veggies", '$2a$10$9ewdl4fUGMerJo5EMu.cduCFC4h5TFsG4f4LsVJK9f9dJOSKkkPzW', function(err, res) {
//     console.log('second guess', res);
//     // res = false
// });


	// if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
	// 	res.json(database.users[0]);
	// 	// res.json('success');
	// }
	// else{
	// 	res.status(400).json('error logging in');
	// }
	// res.json('signin');
}

module.exports={
	handleSignin:handleSignin
}