import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    path: { type: String, required: true }, 
    date: { type: Date }
});

const Video = mongoose.model('Video', videoSchema);

export default Video;