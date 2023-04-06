const Collection = require("../models/Collection");
const User = require("../models/User") //-> remove line 2 after creating authors controller
require("../models/Author");
const Book = require("../models/Book");
const dayjs =  require("dayjs");
const utc = require("dayjs/plugin/utc")
const { LocationDisabledTwoTone } = require("@mui/icons-material");

dayjs.extend(utc)


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

const genres = async (req,res) => {
  try {
    const books = await Collection.find({genre: req.params.genre}).populate("author").exec();
    res.status(200).send(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


const recommended = async (req,res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.preferredGenres.length !== 0) {
    const { preferredGenres } = user;
    const genres = () => preferredGenres.map(genre => {
      return(
      {genre: `${genre}`}
      )
    })
    const books = await Collection.find({
      $or: genres() 
      }).populate("author").exec();
      res.status(200).send(books);
    } else {
      const books = await Collection.find({}).populate("author").exec();
      res.status(200).send(books);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const loans = async (req, res) => {
  try {
    const userId = req.params.id;
    const loanedBooks = await Book.find({
      loanHistory: {
        $elemMatch: {
          loanUser: `${userId}`,
          returnDate: null,
        },
      },
      loanStatus: "Unavailable",
    });
    const loanedBookArray = []
    await Promise.all(loanedBooks.map(async (book) => {
      const bookCollection = await Collection.find({ books: book._id }).populate("author").exec();
      const [destructuredBook] = bookCollection
      const bookOnLoan = {...destructuredBook.toJSON()}
      const bookLoanDate = book.loanHistory.pop()
      const dueDays = dayjs(bookLoanDate.loanDate).add(21,"day").diff(dayjs(new Date()),"day")
      bookOnLoan.dueDays = dueDays
      loanedBookArray.push(bookOnLoan)
    }));
    res.status(200).send(loanedBookArray);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

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
     const loanDate = borrowedBook.loanHistory.pop().loanDate;
     const dueDate = dayjs(loanDate).add(21,"day").utc().local().format('DD/MM/YYYY');
     const bookInfo = {...book.toJSON(), dueDate: dueDate};
    res.status(200).send(bookInfo);
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
    // if (book.books.find(b=>b.loanHistory.some(u=>u.loanUser.toString()!==userId))) {
    //   return res.status(400).json({ error: "User didn't borrow a book from this collection" });
    // }
    const borrowedBook = book.books.find(b=>b.loanHistory.find(u=>u.loanUser.toString()===userId && !u.returnDate))._id
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

const addFavourite = async (req, res) => {
  const user = await User.findById(req.body._id);
  if (user.favouriteBooks.find(b => b.toString() === req.params.id)) {
    return res.status(400).json({ message: 'Book has already been added to favourites' });
  } 
  try {
    const userId = req.body._id; 
    const newFavourite = await User.findByIdAndUpdate(userId, {$push: {"favouriteBooks" : req.params.id}}).populate({ path: 'favouriteBooks', options: { strictPopulate: false } }).exec();
    return res.status(200).json({ message: "Book has been added to favourites." }); 
  } catch (error) {
    console.log('error:', error);
    return res.status(400).json({ error: error.message });
  }
};

const deleteFavourite = async (req, res) => {
    try {
  const user = await User.findById(req.body._id);
  const userId = req.body._id;
  if (user.favouriteBooks.find(b => b.toString() == req.params.id)) {
    const deleteFavourite = await User.findByIdAndUpdate(userId, {$pull: {"favouriteBooks" : req.params.id}}).populate({ path: 'favouriteBooks', options: { strictPopulate: false } }).exec();
      return res.status(201).json({ message: 'Remove book from list' });
  }
  } catch (error) {
    console.log('error:', error);
    return res.status(400).json({ error: error.message });
  }     
  };

const deleteFavouritePage = async (req, res) => {
  try {
    const userId = req.params.id;
    const bookId = req.body.bookId;
    const user = await User.findById(userId);
    const updatedFavourites = user.favouriteBooks.filter((book) => book.toString() !== bookId);
    user.favouriteBooks = updatedFavourites;
    const deleteFavouriteId = await User.findByIdAndUpdate(userId, {$pull: { favouriteBooks: bookId }}, { new: true });
    res.status(200).json({ message: "Favourite book deleted successfully" });
  } catch (error) {
    console.log("Error deleting favourite:", error);
    res.status(500).json({ message: "Error deleting favourite book" });
  }
};


module.exports = { 
  show,
  index,
  recommended,
  loans,
  borrowBook,
  returnBook,
  addFavourite,
  deleteFavourite,
  genres,
  deleteFavouritePage
 };