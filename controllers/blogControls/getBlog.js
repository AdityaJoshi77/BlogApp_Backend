
const Blog = require('../../models/blogModel.js');

// GET API
// Fetches all the records from the database.
const getBlog = async (req,res) => {
    try{
        const blogsData = await Blog.find({});
        res.status(200).json({
            success: true,
            message: 'Le bhai tera data',
            data: blogsData, 
        });
    }
    catch(err){
        console.log(err.message);
        res.status(400).json({
            success: false,
            message: 'Sorry Bhai'
        });
    }
}


// GET API
// Fetches records on the basis of id

const getBlogById = async (req,res) => {
    try{
        // fetching id from the request params
        const id = req.params.id;

        // fetching record on the basis of id
        const newBlog = await Blog.findById({_id:id});

        // definig failure response
        if(!newBlog){
            return res.status(404).json({
                success: false,
                message: 'Tune id galat di hai bhai'
            })
        }

        // defining success response
        res.status(200).json({
            success: true,
            message: 'Le bhai tera data mil gaya',
            data: newBlog
        })
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({
            success: false,
            message: 'internal server error hai bro'
        })
    }
}
module.exports = {getBlog,getBlogById};