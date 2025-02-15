import { z } from "zod";
import passwordValidator from "@sfs/validators/passwordValidator";

const passwordCompareRequestValidator = z.object({
  hash: z.string(),
  password: passwordValidator,
});

export default passwordCompareRequestValidator;
