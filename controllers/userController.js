const User = require('../models/sql/User');

const userController = {
  register: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await user.checkPassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = user.generateAuthToken();
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUserInfo: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ email: user.email, role: user.role });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
