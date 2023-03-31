const Collection = require("../models/Collection");

const show = async (req, res) => {
  try {
    const book = await Collection.findById(req.params.id)
    res.status(200).send(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { show };