// app/api/items/route.ts
import { NextResponse } from "next/server";
const secretToken = process.env.RECAPTCHA_SECRET_KEY as string;

// GET handler
export async function GET() {
  try {
    return NextResponse.json({ items: "rugpull" }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    console.log(body);
    // Validate the request body
    if (!body.token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }

    const googleRes = await getGoogleRes(body.token);

    console.log(googleRes);

    return NextResponse.json({ googleResponse: googleRes }, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}

async function getGoogleRes(token: string): Promise<unknown> {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretToken}&response=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to create item");
    }

    return data;
  } catch (error) {
    console.error("Error creating item:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
