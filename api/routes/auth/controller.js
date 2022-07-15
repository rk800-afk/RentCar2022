import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { User } from "../../../db/models/index.mjs"

// V8 JS => NODEJS 01001010101
// LIBUV => CROSS-PLATFORM, NON BLOCKING I/O, EVENT LOOP

export const getUser = async (req, res) => {
    try {
        const { user } = req
        res.status(200).json({ user })
    } catch (error) {
        console.log(error?.message);
    }
};

export const signUp = async (req, res) => {
    try {
        const salt = bcryptjs.genSaltSync(10);
        const user = req.body
        const cantidate = await User.findOne({ email: user.email })

        if (!cantidate) {
            const { _id, email, role } = await User.create({ email: user.email, role: user.role, password: bcryptjs.compareSync(user.password, salt) })

            const token = jwt.sign(
                { _id, email, role },
                process.env.ACCESS_TOKEN,
                { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES) }
            );
            res.status(201).send({ newUser: { _id, email, role }, token })
        } else {
            res.status(400).send({ message: "User with this email exist!" })
        }
    } catch (error) {
        console.log(error?.message);
    }
};

export const logIn = async (req, res) => {
    try {
        const { email, role, password } = req.body
        const cantidate = await User.findOne({ email })

        console.log(req);

        if (cantidate) {
            const checkPass = bcryptjs.compareSync(password, cantidate.password)
            if (checkPass) {
                const { _id, email, role } = cantidate

                // Create jwt based on email and id, expiration time - 1 hour
                const token = jwt.sign(
                    { _id, email, role },
                    process.env.ACCESS_TOKEN,
                    { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES) }
                );

                res.setHeader('Set-Cookie', `authorization=${token}; HttpOnly; Path=/; Max-Age=${process.env.ACCESS_TOKEN_EXPIRES}s}`)
                res.send({ user: { _id, email, role }, token })
            } else {
                res.status(400).send({ message: "User password not correct!" })
            }
        } else {
            res.status(400).send({ message: "User with this email not exist!" })
        }
    } catch (error) {
        console.log(error?.message);
    }
};

export const logOut = async (req, res) => {
    try {
        res.setHeader('Set-Cookie', `authorization=; HttpOnly; Path=/; Max-Age=0`)
        res.json({ message: "You are logout!" })
    } catch (error) {
        console.log(error?.message);
    }
};