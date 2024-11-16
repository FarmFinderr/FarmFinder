import Post from '../models/Post.js';
import Terrain from '../models/Terrain.js';
import Materiel from '../models/Materiel.js';

export const createPost = async (req, res, next) => {
    try {
        //const post = new Post(req.body);
        const { type } = req.body;

        let post;
        if (type === 'terrain') {
            post = new Terrain(req.body);
        } else if (type === 'materiel') {
            post = new Materiel(req.body);
        } else {
            return res.status(400).json({ message: 'Type invalide' });
        }

        const savedPost = await post.save();
        res.status(201).json(savedPost );
    } catch (err) {
        next(err);
    }
};

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        next(err);
    }
};

export const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
          if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
 
    } catch (err) {
        next(err);
    }
};

export const updatePost = async (req, res, next) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPost);
    } catch (err) {
        next(err);
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted', deletedPost });
    } catch (err) {
        next(err);
    }
};
