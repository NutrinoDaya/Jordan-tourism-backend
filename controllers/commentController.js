import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";

export const createComment = async (req, res) => {
  const { username, comment } = req.body;
  const { BlogId } = req.params;

  if (!username || !comment) {
    return res.status(400).json({ message: "Username and Comment are required fields" });
  }

  try {
    const blog = await Blog.findById(BlogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const newComment = new Comment({
      blog: blog._id,
      username: username,
      comment: comment,
    });

    await newComment.save();

    blog.comments.push(newComment);
    await blog.save();

    // Return the newly created comment object
    res.status(201).json(newComment);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create Comment" });
  }
};

// Get all comments for a specific blog
export const getCommentsByBlogId = async (req, res) => {
  const { BlogId } = req.params;
  try {
    // Check if the blog exists
    const blog = await Blog.findById(BlogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const comments = await Comment.find({ blog: BlogId });
    res.status(200).json({
      count: comments.length,
      message: "Comments retrieved successfully",
      data: comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get blog Comments" });
  }

};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    // Find the comment to be deleted
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Find the blog associated with the comment
    const blog = await Blog.findById(comment.blog);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Remove the comment reference from the blog's comments array
    blog.comments.pull(commentId);
    await blog.save();

    // Delete the comment document from the database
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};
