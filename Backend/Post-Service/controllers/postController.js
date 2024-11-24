import Post from '../models/Post.js';
import Terrain from '../models/Terrain.js';
import Materiel from '../models/Materiel.js';
import axios from 'axios';

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
        const allposts = await Promise.all(
            posts.map(async (post) => {
                try {
                    const user = await axios.get(`http://localhost:8888/users/${post.userId}`);
                    //console.log(user);
                    return { ...post.toObject(), user: user.data }; 

                } catch (error) {
                    console.error(`Failed to fetch user for post ${post._id}:`, error.message);
                    return { ...post.toObject(), user: null }; 
                }
            })
        );

        res.json(allposts);
        //res.json(posts);
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
