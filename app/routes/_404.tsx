import type { NotFoundHandler } from "hono";

const handler: NotFoundHandler = (c) => {
  c.status(404);
  return c.render(
    <>
      <div class={"flex flex-col items-center"}>
        <img
          src="/image.png"
          alt="picture of 404 illustrator"
          width={400}
          class={""}
        />
        <p class={"capitalize text-2xl font-bold"}>la page est Introuvable</p>
      </div>
    </>
  );
};

export default handler;
