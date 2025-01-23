const User = require('../models/User');

// Get User Info
exports.getUserInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userInfo = {
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            email: user.email,
            image: user.image || null,
            mobileNo: user.mobileNo || null,
            address: user.address || null,
            position: user.position || null,
            facebookProfile: user.facebookProfile || null,
            twitterProfile: user.twitterProfile || null,
            instagramProfile: user.instagramProfile || null,
            linkedInProfile: user.linkedInProfile || null,
            extraMobileNo: user.extraMobileNo || null,
            guardianName: user.guardianName || null,
            guardianNo: user.guardianNo || null,
            guardianEmail: user.guardianEmail || null,
        };

        res.status(200).json(userInfo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get All Users
exports.getAllUsersInfo = async (req, res) => {
    const { page = 1, limit = 100 } = req.query;

    const users = await User.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-password');

    const totalUsers = await User.countDocuments();

    res.status(200).json({
        totalUsers,
        users,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
    });
};

// Delete User Info
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create New User
exports.createUser = async (req, res) => {
    const { email, image, mobileNo, address, position, facebookProfile, twitterProfile, instagramProfile, linkedInProfile, extraMobileNo, guardianName, guardianNo, guardianEmail } = req.body;
  
    try {
      const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
  
      Object.assign(user, { image, mobileNo, address, position, facebookProfile, twitterProfile, instagramProfile, linkedInProfile, extraMobileNo, guardianName, guardianNo, guardianEmail });
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user details' });
    }
};  
