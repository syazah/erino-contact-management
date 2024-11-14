import express, { Response, Request } from "express";
import { AddNewContactController } from "../controllers/contact.controller";
const router = express.Router();
router.get("/contacts", AddNewContactController);
export default router;
