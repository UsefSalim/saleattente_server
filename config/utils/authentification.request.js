/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.models');
const {
  registerValidations,
  loginValidations,
} = require('../../validations/auth.validations');

const ifUserExist = async (req, Model) =>
  await User.findOne({ email: req.body.email });

const createToken = (data) =>
  jwt.sign({ data }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });

exports.register = async (req, res) => {
  //* verification des input Register
  const { error } = registerValidations(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  try {
    if (await ifUserExist(req))
      return res.status(400).json('Mail deja existant veiller Vous Connecter');
    const newUser = new User({ ...req.body });
    newUser.password = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );
    if (req.url === '/admin/register') newUser.role = 'Admin';
    const savedUser = await newUser.save();
    if (savedUser)
      return res
        .status(201)
        .json(`User ${newUser.nom} - ${newUser.prenom} created`);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  let tokenName = '';
  const { error } = loginValidations(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const userExist = await ifUserExist(req);
  if (
    !userExist ||
    !(await bcrypt.compare(req.body.password, userExist.password))
  )
    return res.status(400).json('Mail ou password Incorrect');
  const token = createToken({ id: userExist._id, role: userExist.role });
  req.url === '/admin/login' && userExist.role === 'Admin'
    ? (tokenName = 'AdminToken')
    : (tokenName = 'UserToken');
  res
    .status(200)
    .cookie(tokenName, token, {
      httpOnly: true,
      maxAge: process.env.JWT_EXPIRATION_TIME,
    })
    .json({ role: userExist.role, isAuthenticated: true });
};
