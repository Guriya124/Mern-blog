import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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