const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
    const token = req.query.token;
    console.log("Token received: ", token);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.user).select('-password');
        
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }
        console.log(req.user);
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = authenticateUser;
