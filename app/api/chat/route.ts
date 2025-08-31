import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ reply: "Error: Gemini API key not set." });
  }

  try {
    const res = await fetch("https://api.gemini.com/v1/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gemini-1.5", // Use your preferred Gemini model
        prompt: message,
        max_tokens: 200,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ reply: `Error from Gemini API: ${text}` });
    }

    const data = await res.json();

    // Adjust according to Gemini response structure
    const replyText = data?.choices?.[0]?.text || "No response from Gemini.";
    return NextResponse.json({ reply: replyText });
  } catch (err: any) {
    return NextResponse.json({ reply: `Error: ${err.message}` });
  }
}
