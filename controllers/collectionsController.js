const Collection = require("../models/Collection");
const User = require("../models/User") //-> remove line 2 after creating authors controller
require("../models/Author");
const Book = require("../models/Book");


const show = async (req, res) => {
  try {
    const book = await Collection.findById(req.params.id).populate("author").populate("books");
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

const borrowBook = async (req, res) => {
  try {
    const book = await Collection.findById(req.params.id).populate("author").populate("books");
    const userId = req.body._id;
    if (!userId) {
      return res.status(400).json({ error: "Not logged in" });
    }
    if (book.books.filter(b=>b.loanStatus==="Available").length === 0) {
      return res.status(400).json({ error: "No available books to borrow" });
    }
    if (book.books.find(b=>b.loanHistory.find(u=>u.loanUser.toString()===userId && !u.returnDate))) {
      return res.status(400).json({ error: "User has already borrowed a book from this collection" });
    }
    const firstAvailableBookId = book.books.find(b => b.loanStatus === "Available")._id;
    const borrowedBook = await Book.findByIdAndUpdate(firstAvailableBookId, {
      $set: {"loanStatus":"Unavailable"},
      $push: {"loanHistory":[{"loanUser": userId, "loanDate": new Date(),"returnDate": ""}]}
    })
    res.status(200).send(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const returnBook = async (req, res) => {
  try {
    const userId = req.body._id;
    const book = await Collection.findById(req.params.id).populate("author").populate("books");
    if (!userId) {
      return res.status(400).json({ error: "Not logged in" });
    }
    if (book.books.find(b=>b.loanHistory.find(u=>u.loanUser.toString()!==userId))) {
      return res.status(400).json({ error: "User didn't borrow a book from this collection" });
    }
    const borrowedBook = book.books.find(b=>b.loanHistory.find(u=>u.loanUser.toString()===userId))._id
    const returnBook = await Book.findOneAndUpdate(
      { _id: borrowedBook._id, "loanHistory.loanUser" : userId, "loanHistory.returnDate": null},
      { $set: { 'loanHistory.$.returnDate': new Date(), loanStatus: 'Available' } },
      { new: true },
    );
    res.status(200).send(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { 
  show,
  index,
  recommended,
  loans,
  borrowBook,
  returnBook
 };