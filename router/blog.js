import express from 'express';
import {
  createBlog,
  updateBlog,
  getSingleBlog,
  getAllBlogs,
  getFeaturedBlogs,
  deleteBlog
} from '../controllers/blogController.js';

const blogRoute = express.Router();

blogRoute.get('/featured', getFeaturedBlogs);

blogRoute.get('/:id', getSingleBlog);

blogRoute.get('/', getAllBlogs);

blogRoute.post('/', createBlog);

blogRoute.put('/:id', updateBlog);

blogRoute.delete('/:id', deleteBlog);

export default blogRoute;
