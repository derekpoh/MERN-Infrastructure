const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    title: { 
        type: String, 
        required: true, 
        maxLength: 200 
    },
    image: { 
        type: String, 
        match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
        maxLength: 200, 
        required: true 
    },
    description: { 
        type: String,
        maxLength: 500, 
        required: true 
    },
    category: {
        type: String,
        enum: ["Fiction", "Non-Fiction"],
        required: true
    },
    genre: [{
        type: String,
        enum: ["Romance", "Mystery", "Thriller", "Science", "Fantasy", "Academic", "Reference", "Fitness", "Health", "Food", "Cooking", "Art", "Finance", "Self-Help", "Multi-Cultural"],
        required: true
    }],
    language: {
        type: String, 
        enum: ["Chinese", "English", "Malay", "Tamil"], 
        required: true
    },
    isbn: { 
        type: String, 
        match: /^\d{13}$/, 
        unique: true, 
        required: true 
    }, 
    publishDate: { 
        type: Date, 
        required: true 
    },
    publisher: { 
        type: String, 
        required: true
    },
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'Author', 
        required: true,
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    }],
}, { 
    timestamps: true, 
});

module.exports = mongoose.model('Collection', collectionSchema);