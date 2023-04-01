const Collection = require("../models/Collection");
const User = require("../models/User") //-> remove line 2 after creating authors controller
require("../models/Author");  

const show = async (req, res) => {
  try {
    const book = await Collection.findById(req.params.id).populate("author")
    res.status(200).send(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const index = async (req,res) => {
  try {
    const books = await Collection.find({}).populate("author").exec();
    res.status(200).send(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const recommended = async (req,res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.preferredGenres === null) {
    const { preferredGenres } = user;
    const genres = () => preferredGenres.map(genre => {
      return(
      {genre: `${genre}`}
      )
    })
    const books = await Collection.find({
      $or: genres() 
      })
      res.status(200).send(books);
    } else {
      const books = await Collection.find({}).populate("author").exec();
      res.status(200).send(books);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const loans = async (req,res) => {
  try {
    const books = await Collection.find({}).populate("author").exec();
    res.status(200).send(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { 
  show,
  index,
  recommended,
  loans
 };