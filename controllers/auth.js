const User = require('../models/user');


exports.signup = async(req,res) => {

    let {name,email,password} = req.body;

    try {

        let user = await User.findOne({email});

        if( user) return {message : "User already added !!!"};

        let result = await User.create({name,email,password});

        return {message : "User created successfully !!!"};

    } catch (error) {
        return {message:"Something went wrong !!!"};
    }
}


exports.signin = async(req,res) => {
    
    let {email,password} = req.body;

    try {

        let user = await User.findOne({email});

        if( ! user) return "User not found !!!";

        if(user.password !== password) return "Invalid credentials !!!";

        return "Succesfully loggedin !!!"

    } catch (error) {

        return 'Something went wrong !!!'
    }
  
      
}