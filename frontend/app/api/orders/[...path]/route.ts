import { NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function proxy(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  if (!API_URL) {
    return NextResponse.json(
      {
        success: false,
        message: "API URL is not configured",
      },
      { status: 500 },
    )
  }

  const { path } = await params

  const targetUrl = `${API_URL}/api/orders/${path.join("/")}`

  const headers = new Headers(request.headers)

  headers.delete("host")

  const body =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.text()

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
    redirect: "manual",
  })

  const responseBody = await response.arrayBuffer()

  const proxyResponse = new NextResponse(responseBody, {
    status: response.status,
    statusText: response.statusText,
  })

  response.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "content-encoding") {
      proxyResponse.headers.set(key, value)
    }
  })

  return proxyResponse
}

export const GET = proxy
export const POST = proxy
export const PATCH = proxy
export const DELETE = proxy