const User = require("../models/User");
const Collection = require("../models/Collection")
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");

const create = async (req, res) => {
    const {password, name} = req.body;
    if (password.length < 3) {
        return res.status(400).json({ error: "your password is too short" });
    };
    if (password.length > 30) {
        return res.status(400).json({ error: "your password is too long" });
    };
    if (name.length > 100) {
        return res.status(400).json({ error: "your name is too long" });
    };
    try {
    const user = await User.create(req.body);
    const payload = { user };
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn:60*60});
    res.status(201).json(token);
    } catch (error) {
        res.status(500).json(error);
    };
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "User or password is invalid" });
            return;
        };

        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const payload = { user };
          const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60*60 });
          res.status(200).json(token);
        } else {
          res.status(401).json({ message: "User or password is invalid" });
        };
    } catch (error) {
        res.status(500).json(error);
    };
};


const changePrefs = async (req, res) => {
    const {userId, preferredGenres} = req.body;
    try {
          const updatedPrefs = await User.findByIdAndUpdate(
          userId,
          { $set: {preferredGenres}},
          { new: true }
        );
        res.status(200).send(updatedPrefs);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const showFavourites = async (req, res) => {
    res.send("show fav");
//   try {
//     const userId = req.params.user;
//     let user = await User.findById(userId);
//     if (user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     if (user.favourites.length === 0) {
//       return res.status(200).json({ message: 'User has no favourites' });
//     }
//     res.status(200).send(user.favourites);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
};

const addFavourites = async (req, res) => {
    const {userId, favouriteBooks} = req.body;
  try {
    console.log('userId:', userId);
    let user = await User.findById(userId);
    console.log('user:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.favouriteBooks.includes(bookId)) {
      return res.status(400).json({ message: 'Book already added to favourites' });
    }

    user.favouriteBooks.push(bookId);
    await user.save();

    res.json({ message: 'Book added to favourites' });
  } catch (error) {
    console.log('error:', error);
    res.status(400).json({ error: error.message });
  }
};


const deleteFavourites = async (req, res) => {
res.send("delete fav");
};


module.exports = {
    create,
    login,
    changePrefs,
    showFavourites,
    addFavourites,
    deleteFavourites
};
