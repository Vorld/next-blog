import { NextResponse } from 'next/server';

export async function GET(request) {
  // You can access request details via the 'request' object if needed
  // const { searchParams } = new URL(request.url)
  // const name = searchParams.get('name')

  return NextResponse.json({ name: 'John Doe' });
}

// You can also define POST, PUT, DELETE, etc.
// export async function POST(request) { ... }
