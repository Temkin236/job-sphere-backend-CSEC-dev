import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {User} from '../models/authModel.js';

dotenv.config();

const signUp = async (req, res) => {
    const { username, password, email ,role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            role,
            
        });
        await newUser.save();
        const token = jwt.sign(
            { user_id: newUser._id },
            process.env.JWT_SECRET
        );
        const { password: _, ...data } = newUser.toObject();
        return res.json({ ...data, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return res.status(400).json({ message: 'Incorrect password' });
        }
        const token = jwt.sign(
            { user_id: user._id },
            process.env.JWT_SECRET
        );
        const { password: _, ...data } = user.toObject();
        res.json({ ...data, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const protectedRoute = async (req, res) => {
    const user = req.user;

    return res.json({
        message: 'You are authorized',
        user
    });
};

export { login, protectedRoute, signUp };