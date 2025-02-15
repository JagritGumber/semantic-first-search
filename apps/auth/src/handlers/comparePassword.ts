import HashError from "@sfs/errors/HashError";
import { createSecretsClient } from "@sfs/clients";
import { Context } from "hono";

export const comparePassword = async (
  c: Context<{ Bindings: CloudflareBindings }>,
  password: string,
  hash: string
): Promise<boolean> => {
  // Intialize
  const client = createSecretsClient(c.env.SECRETS_APP, c.env.SECRETS_HOST);

  const data = await client.password.compare.$post({
    json: {
      password,
      hash,
    },
  });

  if (!data.ok) throw new HashError("Failed to Compare Password");

  const {
    success,
    data: { match },
  } = await data.json();

  if (!success) {
    throw new HashError("Failed to Compare Password");
  }
  return match;
};
