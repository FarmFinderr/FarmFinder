import mongoose from 'mongoose';

const reactionSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: Number, required: true },
    reactionType: { 
        type: String, 
        enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'], 
        required: true 
    },
    date: { type: Date }
});

const Reaction = mongoose.model('Reaction', reactionSchema);

export default Reaction;