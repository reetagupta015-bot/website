import { defineErrorHandler } from "nitro";

export default defineErrorHandler((error, _event) => {
  console.error("Global Nitro catch:", error);

  const errorDetails = error
    ? error instanceof Error
      ? `${error.name}: ${error.message}\n${error.stack}`
      : typeof error === "object"
        ? JSON.stringify(error, null, 2)
        : String(error)
    : "Unknown error";

  return new Response(
    `[Vercel SSR Diagnostic Error]\n\n${errorDetails}`,
    {
      status: 500,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store, no-cache, must-revalidate",
      },
    }
  );
});
