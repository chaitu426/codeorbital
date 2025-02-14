import { NextResponse } from "next/server";

// Temporary storage for previews
const previews: Record<string, { html: string; css: string; js: string }> = {};

// ✅ Handle POST request (Save snippet)
export async function POST(req: Request, { params }: { params: { userId: string } }) {
    const { userId } = params;
    if (!userId) {
        return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }

    try {
        const { snippet } = await req.json();
        if (!snippet || !snippet.html) {
            return NextResponse.json({ error: "Missing snippet data" }, { status: 400 });
        }

        // Save snippet temporarily
        previews[userId] = snippet;
        return NextResponse.json({ message: "Snippet saved", userId }, { status: 200 });
    } catch (error) {
        console.error("Error saving snippet:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ Handle GET request (Retrieve preview)
export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const { userId } = params;
    if (!previews[userId]) {
        return NextResponse.json({ error: "Preview not found" }, { status: 404 });
    }

    // Generate full HTML with inline CSS and JS
    const { html, css, js } = previews[userId];
    const fullHtml = `
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

    return new NextResponse(fullHtml, { headers: { "Content-Type": "text/html" } });
}

// ✅ Allow OPTIONS request (Fix CORS issues)
export async function OPTIONS() {
    return new NextResponse(null, {
        headers: { "Allow": "GET, POST, OPTIONS" },
    });
}
