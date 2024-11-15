import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import ErrorHandler from "../utils/errorHandler";
import {
  ContactCreationSchema,
  ContactCreationType,
} from "../validation/contact.validation";
import { NextFunction } from "express";

const prisma = new PrismaClient();

// ADDING A NEW CONTACT
export const AddNewContactController = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  try {
    const RequestBody: ContactCreationType = req.body;
    const validate = ContactCreationSchema.safeParse(RequestBody);
    if (!validate.success) {
      return next(ErrorHandler(400, validate.error.errors[0].message));
    }
    const existUser = await prisma.contact.findFirst({
      where: {
        OR: [
          { email: RequestBody.email },
          { phoneNumber: RequestBody.phoneNumber },
        ],
      },
    });
    if (existUser) {
      return next(
        ErrorHandler(409, "User with this credential already exists")
      );
    }
    const user = await prisma.contact.create({
      data: {
        firstName: RequestBody.firstName,
        lastName: RequestBody?.lastName,
        phoneNumber: RequestBody.phoneNumber,
        email: RequestBody.email,
        company: RequestBody.company,
        jobTitle: RequestBody.jobTitle,
      },
    });
    if (!user) {
      return next(
        ErrorHandler(500, "Something went wrong while adding the contact")
      );
    }
    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    return next(error);
  }
};

//GETTING CONTACTS
export const GetAllContactsController = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  try {
    const contacts = await prisma.contact.findMany({});
    if (!contacts || contacts.length === 0) {
      return next(
        ErrorHandler(
          500,
          "Something went wrong while fetching data from the database"
        )
      );
    }
    return res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    return next(error);
  }
};

//UPDATING CONTACT'S INFO
export const UpdateContactInfoController = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  try {
    const RequestBody: ContactCreationType = req.body;
    const validate = ContactCreationSchema.safeParse(RequestBody);
    if (!validate.success) {
      return next(ErrorHandler(400, validate.error.errors[0].message));
    }
    const RequestParam = req.params;
    if (!RequestParam.id) {
      return next(ErrorHandler(400, "No id for contact is found"));
    }

    const updatedContact = await prisma.contact.update({
      where: { id: Number(RequestParam.id) },
      data: {
        firstName: RequestBody.firstName,
        lastName: RequestBody?.lastName,
        email: RequestBody.email,
        phoneNumber: RequestBody.phoneNumber,
        company: RequestBody.company,
        jobTitle: RequestBody.jobTitle,
      },
    });
    return res.status(200).json({ success: true, data: updatedContact });
  } catch (error) {
    return next(error);
  }
};
