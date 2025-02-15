import HashError from "@sfs/errors/HashError";
import { createSecretsClient } from "@sfs/clients";
import { Context } from "hono";

export const hashPassword = async (
  c: Context<{ Bindings: CloudflareBindings }>,
  password: string
): Promise<string> => {
  const client = createSecretsClient(c.env.SECRETS_APP, c.env.SECRETS_HOST);

  const data = await client.password.hash.$post({
    json: {
      password,
    },
  });

  if (!data.ok) throw new HashError("Failed to Hash Password");

  const {
    data: { hash },
    success,
  } = await data.json();

  if (!success) {
    throw new HashError("Failed to Hash Password");
  }
  return hash;
};
