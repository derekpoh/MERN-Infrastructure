const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loanHistorySchema = new Schema({
    loanUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    loanDate: {
        type: Date
    },
    returnDate: {
        type: Date
    },
    reminderDate: {
        type: Date
    },
    loanStatus: {
        type: String,
        enum: ["Borrowed", "Available"],
        default: "Available",
        required: true
    },
});

const bookSchema = new Schema({
    loanHistory: [loanHistorySchema]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Book', bookSchema);

  




