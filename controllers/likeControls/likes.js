
const Blog = require('../../models/blogModel.js');

// PUT API
// finds the post on the basis of id and modifies its like value

const hitLike = async (req,res) => {
    try{
        // Fetching blog id from the request params
        const id = req.params.id;

        // what I wrote:
        // find and update the blog by id
        // const targetBlog = await Blog.findByIdAndUpdate({_id:id});
            // This line returns the database entry as an object.
            // All the fields of this object (as mentioned in the schema can be accessed).

        // ChatGpt : 
        // find and update the blog by id, incrementing the likes by 1
        const targetBlog = await Blog.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },
            { new: true }  // this option returns the modified document
        );

        // failure response
        if(!targetBlog){
            return res.status(404).json({
                success: false,
                message: "id invalid hai bhai"
            })
        }

        // success response
        // targetBlog.likes++; // this was working , hum aise fields access kar sakte hein.
        res.status(200).json({
            success: true,
            message: `Current likes on post (id == ${id}) == ${targetBlog.likes}`
        })
    }
    catch(err){
        console.log('Internal Server error');
        res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}

// PUT API
// finds the post on the basis of id and modifies its like value
const removeLike = async (req,res) => {
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
        if(targetBlog.likes > 0){
            targetBlog.likes--;
            targetBlog.save(); // targetBlog.save(); will persist the changes in the object in the db.
        }

        // success response
        res.status(200).json({
            success: true,
            message: `Current likes on post (id == ${id}) == ${targetBlog.likes}`
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

module.exports = {hitLike,removeLike};