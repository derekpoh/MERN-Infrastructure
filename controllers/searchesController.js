const Collection = require("../models/Collection");
const Author = require("../models/Author");

const search = async (req, res) => {
    try {
      const searchQuery = req.query.q;
      // can't use index method because of Chinese characters in MongoDB
      const regexQuery = new RegExp(searchQuery, 'i');
      // search for authors to link with collection
      const matchingAuthors = await Author.find ({name: regexQuery});
      const authorIds = matchingAuthors.map(author => author._id)

      const books = await Collection.find({
        $or: [
          { title: regexQuery },
          { description: regexQuery },
          { author:  {$in: authorIds } },
          { isbn : { $regex: regexQuery } },
        ],
      }).populate("author");
      res.status(200).json(books);
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ message: "Error searching" });
    }
  };
  
module.exports = { search };