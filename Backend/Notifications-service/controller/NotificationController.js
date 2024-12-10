
import notification from "../model/NotificationModel.js";


export const AddNotif=async (Req,res)=>{
        let notif = new notification(Req.body);
        try {
            await notif.save() ;
            res.status(201).json(Req.body);
        } catch (err) {
          res.status(500).json({ error: err });
        }
}

export const getNotificationsByIdRecu = async (req, res) => {
  try {
      const { id } = req.params; 
      const notifications = await notification.find({  idRecu: id });
      res.json(notifications);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};