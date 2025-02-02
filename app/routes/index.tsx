import { createInsertSchema } from "drizzle-zod";
import { createRoute } from "honox/factory";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { todo, todos } from "../../db/schema";
import { cx } from "hono/css";

export default createRoute(async (c) => {
  const results = await c.var.db.select().from(todos).all();

  const name = c.req.query("name") ?? "Hono";

  return c.render(
    <>
      <div class="bg-white md:shadow p-4">
        <div class="flex md:flex-row flex-col-reverse md:gap-0 gap-4 items-center mb-4">
          <h1 class="flex-1 font-bold text-xl">
            Tracking {results.length} {results.length == 1 ? "task" : "tasks"}
          </h1>
          <form method="post" action={`/todos/clear_completed`}>
            <button
              class="text-yellow-500 hover:underline hover:underline-offset-4"
              type="submit"
            >
              Clear completed tasks
            </button>
          </form>
        </div>

        {results.length == 0 ? (
          <p class="text-gray-600">No tasks yet. Create one below. {name}</p>
        ) : null}

        <ul>
          {results.map((todo) => (
            <li>
              <form
                class={"flex items-center gap-4"}
                method="post"
                action={`/todos/${todo.id}/toggle`}
              >
                <input
                  type="checkbox"
                  name="completed"
                  checked={todo.completed ?? false}
                  // @ts-ignore
                  onChange="this.form.submit()"
                />
                <span
                  class={cx(
                    "capitalize",
                    todo.completed === true ? "line-through" : ""
                  )}
                >
                  {todo.description}
                </span>
              </form>
            </li>
          ))}
        </ul>
      </div>

      <div class="rounded bg-white shadow">
        <form class="flex-1 flex space-y-4" method="post">
          <input
            type="text"
            name="description"
            class="p-4 w-full"
            placeholder="📝 Write a new task. Press enter/return to submit"
            autofocus
            autocomplete="off"
          />
        </form>
      </div>
    </>,
    { title: "Todo app with drizzle" }
  );
});

const insertSchema = createInsertSchema(todos, {
  id: z.undefined(),
});

export const POST = createRoute(zValidator("form", insertSchema), async (c) => {
  const data = c.req.valid("form");
  await c.var.db.insert(todos).values(data as todo);
  return c.redirect("/");
});

// import { css } from 'hono/css'
// import { createRoute } from 'honox/factory'
// import Counter from '../islands/counter'

// const className = css`
//   font-family: sans-serif;
// `

// export default createRoute((c) => {
//   const name = c.req.query('name') ?? 'Hono'
//   return c.render(
//     <div class={className}>
//       <h1>Hello, {name}!</h1>
//       <Counter />
//     </div>,
//     { title: name }
//   )
// })
