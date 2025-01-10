import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    // Ensure headers are present
    const requiredHeaders = ["svix-id", "svix-signature", "svix-timestamp"];
    for (const header of requiredHeaders) {
      if (!req.headers[header]) {
        return res.status(400).json({
          success: false,
          message: `Missing required header: ${header}`,
        });
      }
    }

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Log raw body to debug if necessary
    console.log("Raw Body:", req.rawBody);

    // Verify webhook signature
    whook.verify(req.rawBody, {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.create": {
        const userData = {
          _id: data.id,
          email: data.email_address?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url || "",
          resume: "",
        };
        await User.create(userData);
        return res.status(200).json({ success: true });
      }
      case "user.updated": {
        const userData = {
          email: data.email_address?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url || "",
        };
        await User.findByIdAndUpdate(data.id, userData);
        return res.status(200).json({ success: true });
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({ success: true });
      }
      default:
        return res.status(400).json({
          success: false,
          message: "Unhandled event type",
        });
    }
  } catch (error) {
    console.error("Webhook Error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the webhook.",
    });
  }
};
