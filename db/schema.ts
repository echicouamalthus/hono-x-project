import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { InferInsertModel } from "drizzle-orm";

export const todos = sqliteTable("todos", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  description: text("title").notNull(),
  completed: integer("completed", { mode: "boolean" }).default(false).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(strftime('%s', 'now'))`)
    .notNull(),
});

export type todo = typeof todos.$inferInsert;
