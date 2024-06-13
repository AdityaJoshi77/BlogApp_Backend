
const Blog = require('../../models/blogModel.js');
const mongoose = require('mongoose');
// POST API
// API to create a comment on a blog on the basis of id

const makeComment = async (req,res) => {
    try{
        // fetching blog id from the request parameters
        const id = req.params.id;

        // getting the blog on the basis of id
        const targetBlog = await Blog.findById(id);

        // failure response in case of miss
        if(!targetBlog){
            console.log(`Could not get blog for id == ${id}`);
            return res.status(404).json(
                {
                success: false,
                message:"Blog not found"
                }
            );
        }

        // If the blog is found, following changes will be made to comments field
        const comment = req.body;
        targetBlog.commentCount++;
        targetBlog.comments.addToSet(comment);
        targetBlog.save();

        // success response
        res.status(200).json({
            success: true,
            message: "Comment added successfully"
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


// DELETE API
// Deletes comments from the blog fetched by the id.

const deleteComment = async (req, res) => {
    try {
        // Fetching blog id and comment id from the request params
        const blogId = req.params.blogId;
        const commentId = req.params.commentId;

        // Validate blogId and commentId
        if (!mongoose.Types.ObjectId.isValid(blogId) || !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid blogId or commentId'
            });
        }

        // Find the blog by id and remove the specific comment
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { $pull: { comments: { _id: commentId } }, $inc: { commentsCount: -1 } },
            { new: true } // Return the updated document
        );

        // Check if the blog was found and updated
        if (!updatedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        // Return success response
        res.status(200).json({
            success: true,
            data: updatedBlog
        });
    } catch (err) {
        console.error('Internal Server error', err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


// how to pass multiple parameters in the request url:
// routing url pattern : router.delete('/blogs/:blogId/comments/:commentId', deleteComment);
// url passed in postman: /api/v1/blogs/<blog Id>/comments/<comment id>

module.exports = {makeComment,deleteComment};