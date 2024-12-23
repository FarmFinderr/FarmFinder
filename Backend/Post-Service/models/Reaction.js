import mongoose from 'mongoose';

const reactionSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: String, required: true },
    reactionType: { 
        type: String, 
        enum: ['like', 'love', 'care','haha', 'wow', 'sad', 'angry'], 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }});

const Reaction = mongoose.model('Reaction', reactionSchema);

export default Reaction;