import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/authModel.js';
dotenv.config();

export const authenticate = async (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
        return res.status(401).json({ message: 'You are not authorized' });
    };
    const token = authorizationHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'You are not authorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;    
        next();
    }catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }};