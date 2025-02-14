import { NextResponse } from "next/server";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not defined");
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// ✅ Handle GET request (Retrieve snippet and generate preview)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const snippetId = searchParams.get("snippetId");

  if (!snippetId) {
    return NextResponse.json({ error: "Missing snippetId" }, { status: 400 });
  }

  try {
    const snippet = await convex.query(api.snippets.getSnippetById, { snippetId: snippetId as Id<"snippets"> });

    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    const { code, html, css, js, language } = snippet;
    let finalHtml = "";

    if (language === "webdev") {
      finalHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Preview</title>
          <style>${css || ""}</style>
        </head>
        <body>
          ${html || ""}
          <script>${js || ""}</script>
        </body>
        </html>
      `;
    } else {
      finalHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Code Preview</title>
          <style>
            body { background: #1e1e2e; color: #ffffff; font-family: monospace; padding: 20px; }
            pre { background: #282c34; padding: 10px; border-radius: 5px; overflow-x: auto; }
          </style>
        </head>
        <body>
          <h2>Code Preview (${language})</h2>
          <pre>${code || "No code available"}</pre>
        </body>
        </html>
      `;
    }

    return new NextResponse(finalHtml, { headers: { "Content-Type": "text/html" } });
  } catch (error) {
    console.error("Error retrieving snippet:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
