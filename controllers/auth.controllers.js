/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const User = require('../models/user.models');
const Sale = require('../models/salle_attente.models');

const {
  registerValidations,
  loginValidations,
} = require('../validations/auth.validations');
const { ifExist, createToken, createSale } = require('../utils/auth.utils');

/* ! @Route  : POST => /register
     Desc    : Regsiter the users
     @Access : Pubic
*/
exports.registerController = async (req, res) => {
  const { error } = registerValidations(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  try {
    if (await ifExist(req, User))
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

/* ! @Route  : POST => /login
     Desc    : login the users
     @Access : Pubic
*/
exports.loginController = async (req, res) => {
  let tokenName = '';
  const { error } = loginValidations(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  try {
    const userExist = await ifExist(req, User);
    if (
      !userExist ||
      !(await bcrypt.compare(req.body.password, userExist.password))
    )
      return res.status(400).json('Mail ou password Incorrect');
    const token = createToken({ id: userExist._id, role: userExist.role });
    userExist.role === 'Admin'
      ? (tokenName = 'AdminToken')
      : (tokenName = 'UserToken');
    userExist.role === 'User' && (await createSale(Sale));
    res
      .status(200)
      .cookie(tokenName, token, {
        httpOnly: true,
        maxAge: process.env.JWT_EXPIRATION_TIME,
      })
      .json({ role: userExist.role, isAuthenticated: true });
  } catch (error) {
    return res.status(500).json(error);
  }
};
/* ! @Route  : POST => /logout
     Desc    : Logout the users
     @Access : Pubic
*/
exports.logoutController = (req, res) => {
  res.currentUser.role === 'Admin'
    ? res.clearCookie('AdminToken').json({ role: '', isAuthenticated: false })
    : res.clearCookie('UserToken').json({ role: '', isAuthenticated: false });
};
