import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 401 },
    );
  }

  const body = await request.json();
  const tags = [...new Set(body.tags || [])];
  const paths = [...new Set(body.paths || [])];

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    ok: true,
    revalidated: { tags, paths }
  })
}