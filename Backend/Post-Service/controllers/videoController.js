import Video from '../models/video.js';

// Ajouter une nouvelle vidéo
export const createVideo = async (req, res, next) => {
    try {
        const { postId, path, date } = req.body; 
        const video = new Video({ postId, path, date });
        const savedVideo = await video.save();
        res.status(201).json(savedVideo);
    } catch (err) {
        next(err);
    }
};

// Obtenir toutes les vidéos liées à un post
export const getVideosByPostId = async (req, res, next) => {
    try {
        const videos = await Video.find({ postId: req.params.postId });
        res.json(videos);
    } catch (err) {
        next(err);
    }
};

// Supprimer une vidéo
export const deleteVideo = async (req, res, next) => {
    try {
        const deletedVideo = await Video.findByIdAndDelete(req.params.id);
        res.json({ message: 'Vidéo supprimée', deletedVideo });
    } catch (err) {
        next(err);
    }
};

// Mettre à jour une vidéo
export const updateVideo = async (req, res, next) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedVideo);
    } catch (err) {
        next(err);
    }
};
