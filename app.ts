import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.routes';
dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));


app.options("/", cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());
app.use('/api/v1', authRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the FELIX Backend!");
});
export default app;
