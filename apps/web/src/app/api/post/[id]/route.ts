import { deletePost } from '@/lib/actions/postActions';
import { NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const postId = Number(id);
  if (isNaN(postId))
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });

  const result = await deletePost(postId);
  if (!result) return NextResponse.json({}, { status: 500 });

  return NextResponse.json({}, { status: 200 });
}
