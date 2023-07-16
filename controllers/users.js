const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma-client');

/**
 *
 * @route POST /api/users/login
 * @desc User login - this fucntion return id, email, token, name
 * @access Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please, fill the required fields' });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      return res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '1d' }),
      });
    } else {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Something went wrong' });
  }
};

/**
 *
 * @route POST /api/users/register
 * @desc User registration
 * @access Public
 */
const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ message: 'Please, fill the required fields' });
    }

    const isUserExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (isUserExist) {
      return res.status(400).json({ message: 'This email is already in use, please enter a new one' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '1d' }),
      });
    } else {
      return res.status(400).json({ message: 'Failed to create user' });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Something went wrong' });
  }
};

/**
 *
 * @route GET /api/users/current
 * @desc Get current user
 * @access Private
 */
const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  login,
  register,
  current,
};
