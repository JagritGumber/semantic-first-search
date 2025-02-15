import { GeneratedColumnConfig } from "drizzle-orm";
import {
  integer,
  primaryKey,
  SQLiteColumn,
  sqliteTable,
  SQLiteTableWithColumns,
  text,
} from "drizzle-orm/sqlite-core";

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);
