import express from "express";
import { AddNewContactController } from "../controllers/contact.controller";
const router = express.Router();
router.post("/contacts", AddNewContactController);
export default router;
