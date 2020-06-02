const Clarifai =require('clarifai');

const app = new Clarifai.App({
 apiKey: '9d23ad81066f4912a4fea16d693de186'
});


const handleApiCall =(req,res)=>{

	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data=>{
			res.json(data);
		})
		.catch(err=>res.status(400).json('Unable to work with API'))
}



const handleImage=(req, res,db)=>{
	const {id} = req.body;
	
  db('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]); 
	})
	.catch(err=>res.status(400).json('Error getting entries'))
	// let found = false;
	// database.users.forEach(user=>{
	// 	if(user.id === id){
	// 		found=true;
	// 		user.entries ++;
	// 		return res.json(user.entries);
	// 	}
	// 	// else{
	// 	// 	res.status(404).json('User not found');
	// 	})
	// if (!found) {
	// 	res.status(404).json('User not found');
	// }
}

module.exports={
	handleImage:handleImage,
	handleApiCall:handleApiCall
}