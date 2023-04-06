const Book = require("../models/Book")
const Collection = require("../models/Collection")
const schedule = require("node-schedule")
const nodemailer = require("nodemailer")
const mailgen = require("mailgen")
const dayjs =  require("dayjs")
const utc = require("dayjs/plugin/utc")

dayjs.extend(utc)


const setReminder = async (req,res) => {
  const {user} = req.body;
  const {book} = req.body
  const {reminder} = req.body;
  const bookId = book.books.filter((book) => book.toString() === user._id);

  console.log( "REMINDER:", reminder)

    const transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
          user: process.env.EMAIL, 
          pass: process.env.PASSWORD, 
        },
    });
    
    const mailGenerator = new mailgen ({
        theme:"default",
        product: {
            name: "National Library Board",
            link:"https://mailgen.js"
        }
    });
        
    const response = {
            body: {
                name: "NLB User",
                intro: `This is a reminder message that you have requested on ${dayjs(reminder).utc().local().format('DD/MM/YYYY')} for the following book:`,
                table: {
                    data: [
                        {
                            Book: `${book.title}`,
                            Author: `${book.author.name}`,
                            Due_Date: `${book.dueDate}`,
                        }
                    ]
                },
                outro: "Kindly note that the book will be automatically returned on the due date. \n This is an auto-generated message, please do not reply."
            }
        };
        
    const mail = mailGenerator.generate(response);
        
    const message = {
            from: process.env.EMAIL,
            to: `${user.email}`, 
            subject: "Book Notification", 
            html: mail, 
        };

    const date = new Date(reminder); 
    const year = date.getFullYear()
    const month = date.getMonth();
    const dayOfMonth = date.getDate(); 
    const hour = date.getHours();
    const minute = date.getMinutes();
    const reminderDate = new Date(`${year}`, `${month}`, `${dayOfMonth}`, `${hour}`, `${minute}` , 0 );

    schedule.scheduleJob(reminderDate, () => {
        transporter.sendMail(message);
        console.log("email sent!")
    });
    console.log( "SCHEDULEJOB", schedule.scheduledJobs)
        
    res.status(200).send(req.body);
    };




const index = async (req, res) => {
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

  
const history = async (req,res) => {
  try {
    const userId = req.params.id;
    const loanedBooks = await Book.find({
      loanHistory: {
        $elemMatch: {
          loanUser: `${userId}`
        }
      }
    });
    const transactionHistory = loanedBooks.map((loanedBook) => {
    const loanTransaction = loanedBook.loanHistory.filter(transaction =>
      transaction.loanUser.toString() === userId
    );
    return loanTransaction
  }
  )
  const flattenedTransactionHistory = transactionHistory.flat();
const loanedBookHistory = {
  returned: [],
  unReturned: [],
};
await Promise.all(flattenedTransactionHistory.map( async(transaction) => {
  const bookInfo = await Book.find({
    loanHistory: {
      $elemMatch: {
        _id: `${transaction._id}`
      }
    }
  })
  const [book] = bookInfo
  const bookCollection = await Collection.find({ books: book._id }).populate("author").exec()
  const [collection] = bookCollection
  const completeBookInformation = {
    collection: collection,
    book: book,
    loanHistory: transaction
  }
  if (transaction.returnDate === null) {
    loanedBookHistory.unReturned.push(completeBookInformation)
  } else {
    loanedBookHistory.returned.push(completeBookInformation)
  }
}
))
    res.status(200).send(loanedBookHistory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}      


module.exports = {
    setReminder,
    index,
    history,
}