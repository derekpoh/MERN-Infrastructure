const Book = require("../models/Book")
const Collection = require("../models/Collection")
const schedule = require("node-schedule")
const nodemailer = require("nodemailer")
const mailgen = require("mailgen")

const setReminder = async (req,res) => {

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
    })
        
    const response = {
            body: {
                name: "NLB User",
                intro: "Return your book!",
                table: {
                    data: [
                        {
                            Book: "To Kill A Mockingbird",
                            Description: "How to kill a bird",
                            Due_Date: "10/4/2023",
                        }
                    ]
                },
                outro: "This is an auto-generated message, please do not reply."
            }
        }
        
    const mail = mailGenerator.generate(response);
        
    const message = {
            from: process.env.EMAIL,
            to: "derekpoh_95@hotmail.com", 
            subject: "Book Notification", 
            html: mail, 
        };

    const someDate = new Date(2023, 3, 3, 1, 40, 0);
    schedule.scheduleJob(someDate, () => {
        transporter.sendMail(message);
        console.log("hi")
    })
        
    res.status(200).send(req.body);
    }




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
      
          const loanedBooksCollectionPromises = loanedBooks.map(async (book) => {
            const bookCollection = await Collection.find({ books: book._id })
            const [bookOnLoan] = bookCollection
            return bookOnLoan;
          });
      
          const loanedBooksCollection = await Promise.all(loanedBooksCollectionPromises);
          res.status(200).send(loanedBooksCollection);
        } catch (error) {
          console.error(error);
          res.status(500).send("Server error");
        }
      };


module.exports = {
    setReminder,
    index
}