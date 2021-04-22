/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const Sale = require('../models/salle_attente.models');

exports.ifMailExist = async (req, Model) =>
  await Model.findOne({ email: req.body.email });

exports.todaySale = async () => await Sale.findOne().sort({ date: -1 });

exports.createToken = (data) =>
  jwt.sign({ data }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });

const formatDate = (date) => {
  const newDate = new Date(date);
  const dateSansMin = newDate.toLocaleDateString();
  const spliteDate = dateSansMin.split('/');
  const finalDate = new Date(spliteDate[2], spliteDate[1], spliteDate[0]);
  return finalDate;
};

exports.createSale = async (Sale) => {
  const SaleExiste = await this.todaySale();
  if (!SaleExiste) {
    const newSale = new Sale();
    await newSale.save();
  } else {
    const dateDernierecreation = formatDate(SaleExiste.date);
    const dateNow = formatDate(Date.now());
    if (dateNow > dateDernierecreation) {
      const newSale = new Sale();
      await newSale.save();
    }
  }
};
