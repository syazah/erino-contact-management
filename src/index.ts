import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import ContactRouter from "./routes/contact";
dotenv.config();

// INITIALISING EXPRESS APPLICATION
const app = express();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());

// INITIALISING ROUTES
app.use("/api/v1", ContactRouter);

// LISTENING TO PORT
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
