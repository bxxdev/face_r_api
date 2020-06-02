 const handleProfileGet=(req, res,db)=>{
	const {id} = req.params;
	// let found = false;

db.select('*').from('users')
	.where({id})
	.then(user=>{
		if (user.length){
			res.json(user[0])
		}
		else{
			res.status(400).json('Not found')
		}
		})
	.catch(err=>res.status(400).json('Error getting user'))
	
	// console.log(user[0]);


	// database.users.forEach(users=>{
	// 	if(users.id === id){
	// 		found=true;
	// 		return res.json(users);
	// 	}
	// 	// else{
	// 	// 	res.status(404).json('User not found');
	// 	})
	// if (!found) {
	// 	res.status(404).json('User not found');
	// }
	}


module.exports={
	handleProfileGet:handleProfileGet
}