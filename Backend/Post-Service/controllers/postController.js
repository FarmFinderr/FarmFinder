import Post from '../models/Post.js';
import Terrain from '../models/Terrain.js';
import Materiel from '../models/Materiel.js';
import Image from '../models/Image.js';
import Video from '../models/video.js';
import Reaction from '../models/Reaction.js';
import Comment from '../models/Commentaire.js';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { log } from 'console';

export const createPost = async (req, res, next) => {
    try {
        const { userId, price, description, type, localisation, air, etat, defaut } = req.body;
        //console.log(req.body);
        //console.log(userId, price, description, type, localisation, air, etat, defaut);
        let postData = { userId, price, description, type };

        if (type === 'terrain') {
            if (!localisation || !air) {
                return res.status(400).json({ message: 'Localisation et air requis pour un terrain.' });
            }
            postData = { ...postData, localisation, air };
        } else if (type === 'materiel') {
            postData = { ...postData, etat, defaut };
        } else {
            return res.status(400).json({ message: 'Type invalide.' });
        }
        const post = new Post(postData);
        //console.log("avant save post ");

        const savedPost = await post.save();
        //console.log(savedPost);
        res.status(201).json({ post: savedPost });
    } catch (err) {
        next(err);
    }
};
export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find(); 

        const allPosts = await Promise.all(
            posts.map(async (post) => {
                try {

                    const userResponse = await axios.get(`http://localhost:8880/users/${post.userId}`);
                    const user = userResponse.data;

                    const images = await Image.find({ postId: post._id });

                    const videos = await Video.find({ postId: post._id });

                    const reactions = await Reaction.find({ postId: post._id });
                    const commentaires = await Comment.find({ postId: post._id });

                    const reactionsWithUsers = await Promise.all(
                        reactions.map(async (reaction) => {
                            try {
                                const reactionUserResponse = await axios.get(`http://localhost:8880/users/${reaction.userId}`);
                                return { ...reaction.toObject(), user: reactionUserResponse.data };
                            } catch(er) {
                                console.log(er)
                                return { ...reaction.toObject(), user: null };
                            }
                        })
                    );
                    const commentsWithUsers = await Promise.all(
                        commentaires.map(async (comment) => {
                            try {
                                const commentaireUserResponse = await axios.get(`http://localhost:8880/users/${comment.userId}`);
                                return { ...comment.toObject(), user: commentaireUserResponse.data };
                            } catch {
                                return { ...comment.toObject(), user: null };
                            }
                        })
                    );
                
                    return {
                        ...post.toObject(),
                        user,
                        images,
                        videos,
                        reactions: reactionsWithUsers,
                        commentaires: commentsWithUsers,
                    };

                } catch (error) {
                    console.error(`Failed to process post ${post._id}:`, error.message);
                    return { ...post.toObject(), user: null, images: [], videos: [], reactions: [] };
                }
            })
        );

        res.json(allPosts);
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


export const getTotalPosts = async (req, res, next) => {
    try {
        const totalPosts = await Post.countDocuments();
        res.status(200).json({ total: totalPosts });
    } catch (error) {
        console.error('Error fetching total posts:', error.message);
        next(error);
    }
};


export const getPostsByLocation = async (req, res) => {
    try {
        const posts = await Post.aggregate([
            { $match: { type: 'terrain' } }, 
            { $group: { _id: '$localisation', count: { $sum: 1 } } },
            { $project: { location: '$_id', count: 1, _id: 0 } }
        ]);

        const totalPosts = posts.reduce((acc, post) => acc + post.count, 0);

        const stats = posts.map(post => ({
            location: post.location,
            percentage: ((post.count / totalPosts) * 100).toFixed(2)
        }));
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats posts' });
    }
};

