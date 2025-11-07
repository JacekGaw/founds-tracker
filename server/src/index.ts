import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { runDB } from "./database/db.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config({ override: true });

runDB();


const app = express();
const corsOptions = {
  origin: [
      "http://localhost:8088",
      "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept-Language"],
  credentials: true
};

app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'nonce-randomvalue';"
  );
  next();
});

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).send("Connected to API");
});

app.use("/api/", userRouter);

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});

export default app;
