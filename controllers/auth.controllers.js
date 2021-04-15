const { register, login } = require('../config/utils/authentification.request');

/* ! @Route  : POST => /register
     Desc    : Regsiter the users
     @Access : Pubic
*/
exports.registerController = async (req, res) => {
  register(req, res);
};

/* ! @Route  : POST => /login
     Desc    : login the users
     @Access : Pubic
*/
exports.loginController = async (req, res) => {
  login(req, res);
};
/* ! @Route  : POST => /logout
     Desc    : Logout the users
     @Access : Pubic
*/
exports.logoutController = (req, res) => {
  req.url === '/admin/logout'
    ? res.clearCookie('AdminToken').json({ role: '', isAuthenticated: false })
    : res.clearCookie('UserToken').json({ role: '', isAuthenticated: false });
};
