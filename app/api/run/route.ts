// app/api/run/route.ts
import { NextResponse } from "next/server";

interface TestCase {
  stdin: string;
}

interface ChallengeRequest {
  code: string;
  language_id: number;
  testCases: TestCase[];
}

interface Judge0Result {
  status?: { id: number; description: string };
  stdout?: string;
  stderr?: string;
  compile_output?: string;
}

export async function POST(req: Request) {
  try {
    const { code, language_id, testCases } = (await req.json()) as ChallengeRequest;

    if (!code || !language_id || !Array.isArray(testCases)) {
      return NextResponse.json(
        { error: "Missing code, language_id, or testCases" },
        { status: 400 }
      );
    }

    if (!process.env.RAPIDAPI_KEY) {
      return NextResponse.json(
        { error: "RAPIDAPI_KEY not set in environment" },
        { status: 500 }
      );
    }

    const results: Judge0Result[] = [];

    for (const [idx, testCase] of testCases.entries()) {
      // 1️⃣ Submit code to Judge0
      const submissionRes = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            source_code: code,
            language_id: Number(language_id),
            stdin: testCase.stdin || "",
          }),
        }
      );

      if (!submissionRes.ok) {
        const text = await submissionRes.text();
        console.error("Judge0 submission failed:", text);
        throw new Error(`Submission failed for test case ${idx + 1}`);
      }

      const { token } = await submissionRes.json();

      // 2️⃣ Poll Judge0 for result
      let result: Judge0Result | null = null;
      for (let i = 0; i < 20; i++) {
        const res = await fetch(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`,
          {
            headers: {
              "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );

        result = await res.json();

        // SAFETY: ensure result is an object and status exists
        if (
          result &&
          typeof result === "object" &&
          "status" in result &&
          result.status?.description
        ) {
          const status = result.status.description;
          if (status !== "In Queue" && status !== "Processing") {
            break; // finished
          }
        } else {
          console.error("Unexpected Judge0 response:", result);
          break; // break to avoid crash
        }

        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2s delay
      }

      if (!result) {
        throw new Error(`No result returned for test case ${idx + 1}`);
      }

      results.push(result);
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Judge0 API Error:", error);
    return NextResponse.json(
      {
        error: "Execution failed",
        details: error instanceof Error ? error.message : JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
