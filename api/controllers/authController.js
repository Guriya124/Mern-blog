import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password || userName === '' || email === '' || password === '') {
        next(errorHandler(400, 'All fileds are required'))

    }
    const hashPassword = bcryptjs.hashSync(password, 10);
    try {
        const existingUser = await User.findOne({ $or: [{ userName: userName }, { email: email }] });
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 400;
            throw error;
        }
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        });

        const user = await newUser.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        next(error);

    }



};

// SignIn Controller

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const isMatch = bcryptjs.compareSync(password, validUser.password);
        if (!isMatch) {
            return next(errorHandler(400, 'Invalid password'));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).cookie('token', token, { httpOnly: true }).json({ message: 'Sign-in successful', user: validUser });
    } catch (error) {
        next(error);
    }
};