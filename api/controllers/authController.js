import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password || userName === '' || email === '' || password === '') {
        return res.status(400).json({ message: 'All fields are required' });

    }
    const hashPassword = bcryptjs.hashSync(password, 10);
    try {
        const existingUser = await User.findOne({ $or: [{ userName: userName }, { email: email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        });

        const user = await newUser.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });

    }



};