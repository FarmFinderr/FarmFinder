import Message from "../model/MessageModel.js";

// Ajouter un nouveau message
export const addMessage = async (req, res) => {
  let message = new Message(req.body);
  try {
    await message.save();
    res.status(201).json(req.body);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Récupérer tous les messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Récupérer un message par ID
export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Récupérer les messages par ID du destinataire
export const getMessagesByReceiverId = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await Message.find({ id_receiver: id });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Mettre à jour un message
export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMessage = await Message.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(updatedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Supprimer un message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
