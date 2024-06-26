import express from "express";
import account from "./routes/account";
import auth from "./routes/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config';

export interface JwtPayload {
    email: string
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
    "http://localhost:3000",
    "https://cryptonary-bit.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization"
}));

app.get("/", (req, res) => {
    res.send("hello from BE");
});

app.use("/", [auth, account]);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;