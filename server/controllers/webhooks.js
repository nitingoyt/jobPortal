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
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // geting data from body
    const { data, type } = req.body;
    console.log("Request Body:", req.body);

    // Switch cases for diff events
    switch (type) {
      case "user.created": {
        const email =
          Array.isArray(data.email_addresses) && data.email_addresses.length > 0
            ? data.email_addresses[0].email_address
            : null;

        if (!email) {
          throw new Error("Email address not found in user.create event.");
        }
        const userData = {
          _id: data.id,
          email,
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
          email,
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
    console.log(error.message);
    res.json({ success: false, message: "Webhook Message" });
  }
};
