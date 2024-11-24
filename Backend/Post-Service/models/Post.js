/*import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({

    userId: { type: String, required: true },

    price: { type: Number, required: true },

    description: { type: String, required: true },

    type: { type: String, enum: ['terrain', 'Materiel'], required: true },

    localisation: { type: String, required: true },

    air: { type: Number, required: false },

    defaut: { type: String },

    date: { type: Date, default: Date.now },

    etat: { type: String}
});

const Post = mongoose.model('Post', postSchema);

export default Post;*/


// models/Post.js

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({

    userId: { type: Number , required: true },

    price: { type: Number, required: true },

    description: { type: String, required: true },

    type: { type: String, required: true, enum: ['terrain', 'materiel'] },
    
    date: { type: Date, default: Date.now },

}, { discriminatorKey: 'type', collection: 'posts' });

const Post = mongoose.model('Post', postSchema);

export default Post;

