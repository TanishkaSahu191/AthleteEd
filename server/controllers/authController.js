const jwt = require('jsonwebtoken');
const { users } = require('../data/demoData');
const { JWT_SECRET } = require('../middleware/auth');

// POST /api/v1/auth/login
const login = (req, res) => {
  const { email, role } = req.body;

  let user = null;
  if (email) {
    user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  } else if (role) {
    user = users.find(u => u.role.toLowerCase() === role.toLowerCase());
  }

  // Fallback demo user if none found
  if (!user) {
    user = users[0]; // Admin fallback
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      studentId: user.studentId || null
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.status(200).json({
    success: true,
    message: `Logged in successfully as ${user.role}`,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      studentId: user.studentId
    }
  });
};

// GET /api/v1/auth/me
const getMe = (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  return res.status(200).json({
    success: true,
    user
  });
};

// GET /api/v1/auth/demo-users
const getDemoUsers = (req, res) => {
  return res.status(200).json({
    success: true,
    users: users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      avatar: u.avatar,
      specialization: u.specialization || u.sport || u.gradeLevel || null
    }))
  });
};

module.exports = {
  login,
  getMe,
  getDemoUsers
};
