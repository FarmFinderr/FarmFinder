import Image from '../models/Image.js';

// Ajouter une nouvelle image
export const createImage = async (req, res, next) => {
    try {
        const { postId, path, date } = req.body; 
        const image = new Image({ postId, path, date });
        const savedImage = await image.save();
        res.status(201).json(savedImage);
    } catch (err) {
        next(err);
    }
};

// Obtenir toutes les images d'un post
export const getImagesByPostId = async (req, res, next) => {
    try {
        const images = await Image.find({ postId: req.params.postId });
        res.json(images);
    } catch (err) {
        next(err);
    }
};

// Supprimer une image
export const deleteImage = async (req, res, next) => {
    try {
        const deletedImage = await Image.findByIdAndDelete(req.params.id);
        res.json({ message: 'Image supprimée', deletedImage });
    } catch (err) {
        next(err);
    }
};
