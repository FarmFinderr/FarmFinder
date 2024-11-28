import Post from '../models/Post.js';
import Terrain from '../models/Terrain.js';
import Materiel from '../models/Materiel.js';
import Image from '../models/Image.js';
import Video from '../models/video.js';
import Reaction from '../models/Reaction.js';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

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




/*export const getAllPosts = async (req, res, next) => {

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
};*/

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find(); 

        const allPosts = await Promise.all(
            posts.map(async (post) => {
                try {

                    const userResponse = await axios.get(`http://localhost:8888/users/${post.userId}`);
                    const user = userResponse.data;

                    const images = await Image.find({ postId: post._id });

                    const videos = await Video.find({ postId: post._id });

                    const reactions = await Reaction.find({ postId: post._id });

                    const reactionsWithUsers = await Promise.all(
                        reactions.map(async (reaction) => {
                            try {
                                const reactionUserResponse = await axios.get(`http://localhost:8888/users/${reaction.userId}`);
                                return { ...reaction.toObject(), user: reactionUserResponse.data };
                            } catch {
                                return { ...reaction.toObject(), user: null };
                            }
                        })
                    );

                    return {
                        ...post.toObject(),
                        user,
                        images,
                        videos,
                        reactions: reactionsWithUsers,
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
