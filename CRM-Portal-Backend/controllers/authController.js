const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Signup User
exports.upsertSignup = async (req, res) => {
    const { firstName, middleName, lastName, email, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    let user = await User.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (user) {
        user.firstName = firstName || user.firstName;
        user.middleName = middleName || user.middleName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.password = hashedPassword; 

        await user.save();
        const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token, user });
    } else {
        user = await User.create({ firstName, middleName, lastName, email, password: hashedPassword });
        const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token, user });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token, user });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
