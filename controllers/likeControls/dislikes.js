
const Blog = require('../../models/blogModel.js');

// PUT API
// increments the unlike value and decrements the like value
const hitDislike = async (req,res) => {
    try{
        // Fetching blog id from the request params
        const id = req.params.id;

        // fetch the db object by id to check whether it exists:
        const targetBlog = await Blog.findByIdAndUpdate(
            id,
            { $inc: { dislikes: 1 } },
            { new: true }  // this option returns the modified document, persists changes.
        );

        // failure response
        if(!targetBlog){
            return res.status(404).json({
                success: false,
                message: "id invalid hai bhai"
            })
        }

        // decrementing likes value conditionally
        if(targetBlog.likes > 0){
            targetBlog.likes--;
            targetBlog.save();
        }

        // success response:
        res.status(200).json({
            success: true,
            message: `blog id == ${id}, likes == ${targetBlog.likes}, dislikes == ${targetBlog.dislikes}`,
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


// PUT API
// finds the post on the basis of id and modifies its like value
const removeDislike = async (req,res) => {
    try{
        // Fetching blog id from the request params
        const id = req.params.id;

        // fetch the db object by id to check whether it exists:
        const targetBlog = await Blog.findById({_id:id});

        // failure response if entry not found:
        if(!targetBlog){
            return res.status(404).json({
                success: false,
                message: "id invalid hai bhai"
            })
        }

        // check and accordingly decrement the like value:
        if(targetBlog.dislikes > 0){
            targetBlog.dislikes--;
            targetBlog.save(); // targetBlog.save(); will persist the changes in the object in the db.
        }

        // success response
        res.status(200).json({
            success: true,
            message: `blog id == ${id}, likes == ${targetBlog.likes}, dislikes == ${targetBlog.dislikes}`,
        })
    }
    catch(err){
        console.error(err);
        console.log('Internal Server error');
        res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}

module.exports = {hitDislike,removeDislike};