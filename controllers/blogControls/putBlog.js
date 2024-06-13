
const Blog = require('../../models/blogModel.js');

const putBlog = async (req,res) => {
    try{
        // fetching blog id from the request params
        const id = req.params.id;

        // extracting updated details from the request params
        const newDetails = req.body 

        // updating the blog on the basis of id
        const newBlog = await Blog.findByIdAndUpdate({_id:id},newDetails);

        // failure response
        if(!newBlog){
            return res.status(404).json({
                success: false,
                message: 'Tune id galat di hai bhai'
            })
        }

        // success response
        res.status(200).json({
            success: true,
            message:'Bhai update ho gaya record',
            data: newBlog
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

module.exports = {putBlog};