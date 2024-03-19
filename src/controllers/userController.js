const User = require( '../models/user' );

const getAllUsers = async(req, res)=>{
    try{
        let users = await User.find();
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({message: `error while fetching users ${error}`})
    }
}


module.exports = {getAllUsers}