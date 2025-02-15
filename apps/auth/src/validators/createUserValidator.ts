import passwordValidator from "@sfs/validators/passwordValidator";
import { z } from "zod";

export const createUserValidator = z.object({
  name: z.string(),
  email: z.string().email(),
  password: passwordValidator,
});

export type CreateUserRequestPayload = z.infer<typeof createUserValidator>;
