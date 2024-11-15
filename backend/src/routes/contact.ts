import express from "express";
import {
  AddNewContactController,
  DeleteContactInfoController,
  GetAllContactsController,
  UpdateContactInfoController,
} from "../controllers/contact.controller";
const router = express.Router();

// ROUTES
router.post("/contacts", AddNewContactController);
router.get("/contacts", GetAllContactsController);
router.put("/contacts/:id", UpdateContactInfoController);
router.delete("/contacts/:id", DeleteContactInfoController);

export default router;
