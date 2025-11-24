import { User } from '@/models/User';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type Session = {
  user: Pick<User, 'id' | 'name' | 'avatar'>;
  accessToken: string;
};

const SESSION_COOKIE_NAME = 'session';

export const createSession = async (payload: Session) => {
  if (!process.env.SESSION_SECRET)
    throw new Error('SESSION_SECRET is not defined');

  const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);

  const expiredAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);

  (await cookies()).set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiredAt,
    sameSite: 'lax',
    path: '/',
  });
};

export const getSession = async () => {
  if (!process.env.SESSION_SECRET)
    throw new Error('SESSION_SECRET is not defined');

  const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET);
  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ['HS256'],
    });

    return payload as Session;
  } catch (error) {
    console.error('Failed to verify the session:', error);
    redirect('/auth/signin');
  }
};

export const deleteSession = async () => {
  (await cookies()).delete(SESSION_COOKIE_NAME);
};
