const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

  
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


exports.getUsers = async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);

    }catch(err){
        res.status(500).send(err.message);  
    }
}


