
const Blog = require('../../models/blogModel.js');

const deleteBlog = async (req,res) => {
    try{
        // fetching blog id from the request params
        const id = req.params.id;

        // finding and deleting the blog on the basis of id
        const deletedBlog = await Blog.findByIdAndDelete({_id:id});

        // failure response
        if(!deletedBlog){
            return res.status(404).json({
                success: false,
                message: 'Tune id galat di hai bhai'
            })
        }

        // success response
        res.status(200).json({
            success: true,
            message:'Bhai delete ho gaya record',
            data: deletedBlog
        });
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({
            success: false,
            message: 'internal server error hai bro'
        })
    }
}

module.exports = {deleteBlog};