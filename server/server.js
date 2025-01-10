import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import "./config/instrument.js"
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";

const PORT = process.env.PORT || 4000; // port

const app = express();

// connect DB
await connectDB()


// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.get("/", (req, res) => res.send("Working"));
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhooks)


Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Listening to PORT: http://localhost:${PORT}`);
});
