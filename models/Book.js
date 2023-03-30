const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema (
  {
    name: { type: String, unique: true, required: true, trim: true },
  }
)

const Author = mongoose.model("Author", authorSchema);


const collectionSchema = new Schema(
  {
    title: { type: String, unique: true, required: true, trim: true },  //--> if we want same title, different objectId -> remove unique:true
    image: { type: String, match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, unique: true, required: true },
    description: { type: String, unique: true, required: true },

    language: { type: String, enum: ["Chinese", "English", "Malay", "Tamil"], unique: true, required: true, trim: true, },
    subject: { type: String, enum: ["Fiction", "Non-fiction", "Romance", "Mystery", "Thriller", "Science", "Fantasy", "Academic", "Reference", "Fitness", "Health", "Food", "Cooking", "Art", "Finance", "Self-Help"], required: true },
    isbn: { type: String, match: /^\d{13}$/, unique: true, required: true }, 
    publishDate: { type: String, match: /^(0?[1-9]|[12][0-9]|3[01])\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/, unique: true, required: true },
    publisher: { type: String, unique: true, required: true, trim: true },
    ebook: { type: Boolean, default: false, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true, trim: true },
    books: { type: Number, required: true, default: 1 }, //--> if want different objectId, change to array of objects 
    
    // copies: [
    //   {
    //     copyID: { type: Number, required: true },
    //     location: { type: String, required: true },
    //     available: { type: Boolean, default: true, required: true }
    //   }

  },
  { 
    timestamps: true, 
  }
);

  const Book = mongoose.model("Book", bookSchema);



  const bookSchema = new Schema(
    {
      loanUser: { type: Schema.Types.ObjectId, ref: 'User', required: true, trim: true },
      loanDate: { type: Date, required: true },
      returnDate: { type: Date, required: true },
      notificationDate: { type: Date },
      loanStatus: { type: String, enum: ["Borrowed", "Returned"], default: "Borrowed", required: true },
    },
    { 
    timestamps: true, 
  }
  );
  
//     loanBook: { 
//       copyID: { type: Number, required: true },
//       book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }
//     }, 
  
const Loan = mongoose.model("Loan", loanSchema);  

module.exports = { 
  Author, 
  Book,
  Loan 
};

//------------- Borrow book function (easier way) ------------------------

async function borrowBook(bookId, userId) {
  // Find the book by ID
  const book = await Book.findById(bookId);
  if (!book) {
    throw new Error('Book not found');
  }
  
  // Check if there are any copies available
  if (book.copiesAvailable === 0) {
    throw new Error('No copies available');
  }
  
  // Decrement the copies available and save the book
  book.copiesAvailable -= 1;
  await book.save();
  
  // Create a new loan record
  const loan = new Loan({
    loanBook: bookId,
    loanUser: userId,
    loanDate: new Date(),
  });
  await loan.save();
  
  return loan;
}

// ------------- Return book function --------------

async function returnBook(bookId, userId) {
  // Find the loan by book and user IDs
  const loan = await Loan.findOne({
    loanBook: bookId,
    loanUser: userId,
    returnDate: null,
  });
  if (!loan) {
    throw new Error('Loan not found');
  }
  
  // Update the loan with the return date
  loan.returnDate = new Date();
  await loan.save();
}


//------ Borrow/ Return book function -> same title, different objectId ------

// Borrow a book
async function borrowBook(bookId, userId, copyId) {
  const book = await Book.findById(bookId);
  const user = await User.findById(userId);
  const copy = await Book.findOne({_id: copyId, copiesAvailable: {$gt: 0}});

  if (!book || !user || !copy) {
    throw new Error("Invalid book, user, or copy");
  }

  const loan = new Loan({
    loanBook: copyId,
    loanUser: userId,
    loanDate: new Date(),
    loanStatus: "borrowed",
  });

  copy.copiesAvailable--;
  await copy.save();
  await loan.save();

  return loan;
}



  // "Fiction", "Non-Fiction", "Children", "Academic", "Reference", "Food", "Religion", "Self-Help", "Fantasy", "Romance", "Mystery", "Horror", "Sports", "Arts", "Business", "History", "Health"

  // isbn: { type: String, match: /^\d{13}$/, unique: true, required: true }, 
  // genre: { type: String, unique: true, required: true, trim: true },
  // category: { type: String, unique: true, required: true, trim: true },



