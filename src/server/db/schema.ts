import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey(),
  body: text("body").notNull(),
  archived: integer("archived", { mode: "boolean" }).notNull().default(false),
});
