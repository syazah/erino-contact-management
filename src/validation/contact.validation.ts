import { z } from "zod";

const ContactCreationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  company: z.string(),
  jobTitle: z.string(),
});

type ContactCreationType = z.infer<typeof ContactCreationSchema>;

export { ContactCreationSchema, ContactCreationType };
