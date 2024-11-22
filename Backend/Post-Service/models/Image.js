import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    postId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Post', 
         required: true 
        },
    path: { type: String, required: true }, 
    date: { type: Date, default: Date.now }
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
