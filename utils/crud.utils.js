const ObjectID = require('mongoose').Types.ObjectId;

exports.getAll = async (res, Model) => {
  try {
    const all = await Model.find();
    if (all) return res.status(200).json(all);
  } catch (err) {
    return res.status(400).json({ err });
  }
};
exports.deleteOne = async (req, res, Model) => {
  if (!ObjectID.isValid(req.params.id))
    return res
      .status(400)
      .json({ message: `l'ID ${req.params.id} n'est pas reconnu` });
  try {
    if (await Model.remove({ _id: req.params.id }).exec())
      return res.status(200).json({
        message: `specialite avec l'id ${req.params.id} est supprimer avec succées`,
      });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
