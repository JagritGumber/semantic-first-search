import { z } from "zod";
import passwordValidator from "@sfs/validators/passwordValidator";

const passwordHashRequestValidator = z.object({
  password: passwordValidator,
});

export default passwordHashRequestValidator;
