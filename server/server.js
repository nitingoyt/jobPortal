import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import "./config/instrument.js"
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import router from "./routes/companyRoute.js";
import connectCloudinaryy from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import {clerkMiddleware} from "@clerk/express"

const PORT = process.env.PORT || 4000; // port

const app = express();

// connect DB
await connectDB()
await connectCloudinaryy()


// Middlewares
app.use(cors()); 
app.use(express.json());
app.use(clerkMiddleware())


// Routes
app.get("/", (req, res) => res.send("Working"));
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhooks)
app.use("/api/company", router)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)


Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Listening to PORT: http://localhost:${PORT}`);
});

