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

//CATCH ERRORS
app.use((err: any, req: any, res: any, next: any) => {
  const statusCode: number = err.statusCode || 500;
  const message: string = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, message });
});
// LISTENING TO PORT
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
