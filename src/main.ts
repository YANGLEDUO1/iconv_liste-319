import { Hono } from "hono";
import iconv from "iconv-lite";
const hono = new Hono();
hono.get("/test", (c) => {
  const encodedString = iconv.encode(
    JSON.stringify({
      Status: "101",
      Msg: "错误",
    }),
    "GB2312"
  );
  return new Response(encodedString, {
    headers: {
      "Content-Type": "application/json; charset=GB2312",
      "Content-Length": encodedString?.length.toString(),
    },
  });
});

Bun.serve({
  port: 1234,
  fetch(req: Request) {
    return hono.fetch(req);
  },
});
