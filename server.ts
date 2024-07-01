// import express from "express";
// import account from "./routes/account";
// import auth from "./routes/auth";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import "dotenv/config";

// export interface JwtPayload {
//   email: string;
// }

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cookieParser());
// app.use(express.json());

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://cryptonary-bit.vercel.app",
//   "https://cryptonarybit.com",
//   "https://www.cryptonarybit.com",
//   "www.cryptonarybit.com",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true); // Allow non-origin requests (like curl)
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg =
//           "The CORS policy for this site does not allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//     allowedHeaders: "Content-Type, Authorization",
//     preflightContinue: true,
//   })
// );

// app.options("*", cors()); // Enable pre-flight for all routes

// app.get("/", (req, res) => {
//   res.send("Backend");
// });

// app.use("/", [auth, account]);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// export default app;

import express from "express";
import account from "./routes/account";
import auth from "./routes/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
import { verifyToken } from "./midddleware/verifyToken"; // Adjust the path as necessary
import "dotenv/config";

export interface JwtPayload {
  email: string;
}

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://cryptonary-bit.vercel.app",
  "https://cryptonarybit.com",
  "https://www.cryptonarybit.com",
  "www.cryptonarybit.com",
];

// Middleware setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow non-origin requests (like curl)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        console.log(`Blocked origin: ${origin}`); // Debugging line
        return callback(new Error(msg), false);
      }
      console.log(`Allowed origin: ${origin}`); // Debugging line
      return callback(null, true);
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    preflightContinue: false,
  })
);

app.options("*", cors()); // Enable pre-flight for all routes
app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Backend");
});

app.use("/", auth); // Unprotected routes
app.use("/", verifyToken, account); // Protected routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
