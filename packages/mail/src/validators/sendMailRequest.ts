import { z } from "zod";

const sendMailRequestValidator = z
  .object({
    to: z.string(),
    subject: z.string(),
    type: z.enum(["verify", "reset"]),
    verifyToken: z.string().optional(),
    resetToken: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "verify" && !data.verifyToken) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "verifyToken is required for verify type",
      });
    }

    if (data.type === "reset" && !data.resetToken) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "resetToken is required for reset type",
      });
    }
  });

export default sendMailRequestValidator;
