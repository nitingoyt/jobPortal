import { Webhook } from "svix";
import User from "../models/User.js";

// Api controller

export const clerkWebhooks = async (req, res) => {
  try {
    // Svix instance with clerkwebhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    //   verify headers
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    });

    // geting data from bdy
    const { data, type } = req.body;

    // Switch cases for diff events
    switch (type) {
      case "user.create": {
        const userData = {
          _id: data.id,
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error.message)
    res.json({success:false, message:'Webhook Message' })
  }
};
