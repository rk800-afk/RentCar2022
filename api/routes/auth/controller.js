const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const { User } = require('../../../db/models');

// V8 JS => NODEJS 01001010101
// LIBUV => CROSS-PLATFORM, NON BLOCKING I/O, EVENT LOOP

module.exports.getUser = async (req, res) => {
    try {
        const { user } = req
        res.status(200).json({ user })
    } catch (error) {
        console.log(error?.message);
    } 
};

module.exports.signUp = async (req, res) => {
    try {
        const salt = bcryptjs.genSaltSync(10);
        const user = req.body
        const cantidate = await User.findOne({email: user.email})

        if(!cantidate) {
           const {_id, email, role} = await User.create({email: user.email, role: user.role, password: bcryptjs.compareSync(user.password, salt)})
       
            const token = jwt.sign(
                { _id, email, role },
                process.env.ACCESS_TOKEN,
                { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES) }
            );
            res.status(201).send({ newUser: {_id, email, role}, token })
        } else {
            res.json({message: "User with this email exist!"})
       }
    } catch (error) {
        console.log(error?.message);
    }
};

module.exports.logIn = async (req, res) => {
    try {
       const { email, role, password } = req.body
       const cantidate = await User.findOne({email})

       if(cantidate) {
            const checkPass = bcryptjs.compareSync(password, cantidate.password)
            if(checkPass) {
                const {_id, email, role} = cantidate
                
                // Create jwt based on email and id, expiration time - 1 hour
                const token = jwt.sign(
                    { _id, email, role },
                    process.env.ACCESS_TOKEN,
                    { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES) }
                );

                res.setHeader('Set-Cookie', `authorization=${token}; HttpOnly; Path=/; Max-Age=${process.env.ACCESS_TOKEN_EXPIRES}}`)
                res.send({ user: { _id, email, role }, token })
            } else {
                res.json({message: "User password not correct!"})
            }
       } else {
            res.json({message: "User with this email not exist!"})
       }
    } catch (error) {
        console.log(error?.message);
    }
};

module.exports.logOut = async (req, res) => {
    try {
       res.setHeader('Set-Cookie', `authorization=; HttpOnly; Path=/; Max-Age=0`)
       res.json({message: "You are logout!"})
    } catch (error) {
        console.log(error?.message);
    }
};