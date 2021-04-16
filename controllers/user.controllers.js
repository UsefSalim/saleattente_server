const Sale = require('../models/salle_attente.models');

exports.profileUser = async (req, res) => {
  const user = res.currentUser;
  try {
    const todaySale = await Sale.findOne();
    if (todaySale) res.status(200).json({ user, todaySale });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.createConsultation = async (req, res) => {
  // try {
  //   const todaySale = await Sale.findOne();
  // } catch (error) {
  //   return res.status(500).json(error);
  // }
};
