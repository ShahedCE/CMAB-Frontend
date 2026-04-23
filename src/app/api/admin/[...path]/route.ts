import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE_URL =
  process.env.BACKEND_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:4000";

async function forward(request: NextRequest, params: { path: string[] }) {
  const targetPath = params.path.join("/");
  const url = `${BACKEND_BASE_URL}/${targetPath}${request.nextUrl.search}`;

  const headers = new Headers();
  const incomingAuth = request.headers.get("authorization");
  const incomingContentType = request.headers.get("content-type");

  if (incomingAuth) headers.set("authorization", incomingAuth);
  if (incomingContentType) headers.set("content-type", incomingContentType);

  const method = request.method.toUpperCase();

  const body =
    method === "GET" || method === "HEAD"
      ? undefined
      : await request.arrayBuffer();

  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
      cache: "no-store",
    });

    const responseBuffer = await response.arrayBuffer();

    return new NextResponse(responseBuffer, {
      status: response.status,
      headers: {
        "content-type":
          response.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Backend যোগাযোগ করা যাচ্ছে না। সার্ভার চলছে কিনা দেখুন।" },
      { status: 502 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return forward(request, await context.params);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return forward(request, await context.params);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return forward(request, await context.params);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return forward(request, await context.params);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return forward(request, await context.params);
}