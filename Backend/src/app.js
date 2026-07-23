import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import chatSessionRouter from "./routes/chatSession.routes.js";
import messageRouter from "./routes/message.routes.js";

const app = express();

// Render (and most hosts) terminate HTTPS at a proxy in front of the app.
// Trusting the proxy lets Express treat requests as secure so Secure cookies work.
app.set("trust proxy", 1);

// CORS Configuration
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(express.static("public"));
app.use(cookieParser());



app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chat-session", chatSessionRouter);
app.use("/api/v1/message", messageRouter);

export default app;