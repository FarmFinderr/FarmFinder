import mongoose from "mongoose";


let MessageSchema = new mongoose.Schema({
    id_notif: { type: String, required: true },
    message: { type: String, required: true },
    id_sender: { type: String, required: true },
    id_receiver: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});


const Message=mongoose.model("Message",MessageSchema)
export default Message;
