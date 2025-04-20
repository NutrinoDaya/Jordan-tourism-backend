import Blog from "../models/Blog.js"

export const createBlog = async (req, res) => {
    try {
      const newBlog = await Blog.create(req.body);
      const savedBlog = await newBlog.save();
      res.status(201).json(newBlog);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Failed to create the blog' });
    }
  };
  

export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the blog' });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the blog' });
  }
};


export const getAllBlogs = async ( req,res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

export const getFeaturedBlogs = async (req, res) => {
  try {
    const featuredBlogs = await Blog.find({ featured: true });
    if (featuredBlogs.length > 0) {
      res.status(200).json({
        success: true,
        message: "Featured blogs retrieved successfully",
        data: featuredBlogs,
      });
    } else {
      res.status(404).json({ success: false, message: "No featured blogs found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to get featured blogs" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    console.log("req : ", req)
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Failed to delete the blog" });
  }
};


  
