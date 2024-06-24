import express from "express";
import account from "./routes/account";
import auth from "./routes/auth";
import cors from "cors";
import cookieParser from "cookie-parser";

export interface JwtPayload {
    email: string
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

const base_url = "http://localhost:3000"

app.use(cors({
    origin: base_url,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization"
}));

app.use("/", [auth, account]);

app.listen(PORT, () => {
    console.log("Server is running on port 5000");
});