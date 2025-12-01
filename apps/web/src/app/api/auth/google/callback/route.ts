import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const avatar = searchParams.get('avatar');
  const accessToken = searchParams.get('accessToken');

  if (!Number(id) || !name || !accessToken) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-token`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (res.status === 401) {
    return NextResponse.json(
      { error: 'Invalid access token' },
      { status: 401 }
    );
  }

  await createSession({
    user: {
      id: Number(id),
      name,
      avatar: avatar || null,
    },
    accessToken,
  });

  redirect('/');
}
