
const Blog = require('../../models/blogModel.js');
const postBlog = async (req,res) => {
    try {
        // fetching blog content from the request...
        const {title, author, content} = req.body;

        // creating blog object in the database...
        // const newBlog = await Blog.create({title, author, content});

        const newBlog = await Blog.create({title, author, content});

        // success response...
        res.status(200).json({
            success: true,
            data: newBlog,
            message: 'Blog posted successfully'
        });
    }
    catch(err){
        console.error(err);
        console.log(err.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

module.exports = {postBlog};