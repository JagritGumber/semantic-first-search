import { z } from "zod";

const passwordValidator = z.string().min(8);
export default passwordValidator;
