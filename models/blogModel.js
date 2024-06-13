const mongoose = require('mongoose');

// Define the Comment Schema
const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        MaxLength: 20
    },
    content: {
        type: String,
        required: true,
        MaxLength: 500
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// Define the Blog Schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        MaxLength: 40
    },
    author: { 
        type: String,
        required: true,
        MaxLength: 20
    },
    content: {
        type: String,
        required: true,
        MaxLength: 1000
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    dislikes: {
        type: Number,
        required: true,
        default: 0
    },
    comments: {
        type: [commentSchema], // Embed the Comment Schema as an array
        required: true,
        default: []
    },
    commentCount:{
        type: Number,
        required: true,
        default: 0
    }
});

// Create the Blog model
module.exports = mongoose.model('Blog', blogSchema);

// The errors I made...
// module.exports = {blogSchema};
// module.exports = mongoose.model("Todo",todoSchema);
