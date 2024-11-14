import { PrismaClient } from "@prisma/client";
import ErrorHandler from "../utils/errorHandler";
import {
  ContactCreationSchema,
  ContactCreationType,
} from "../validation/contact.validation";

const prisma = new PrismaClient();
export const AddNewContactController = async (
  req: any,
  res: any,
  next: any
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
