import { CreateUserValidator } from "@sfs/validators";
import { AuthClient } from "@sfs/clients";

const authClient = new AuthClient(import.meta.env.VITE_AUTH_ORIGIN);
console.log(import.meta.env.VITE_AUTH_ORIGIN);

export default function registerUser(data: CreateUserValidator) {}
