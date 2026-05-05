const prisma = require('../../helpers/prisma-client');
const bcrypt = require('bcryptjs');

const createAdmin = async (req, res) => {
  const { email, password, userName } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const normalizedEmail = String(email).trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = await prisma.user.create({
      data: {
        userName: userName || 'Admin',
        email: normalizedEmail,
        password: hashedPassword,
        role: 'admin',
      },
    });

    res.status(201).json({ message: 'Admin created successfully', userId: admin.id });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Admin with this email already exists' });
    }
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = {
  createAdmin,
};
