import type { SelectUser } from "@sfs/db/users";

import "@auth/core";

declare module "@auth/core" {
  interface User extends SelectUser {}
}
