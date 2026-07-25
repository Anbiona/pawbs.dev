export async function onRequestPost(context) {
  const { request, env } = context;

  const data = await request.json();

  await env.BEDTIME_KV.put("bedtime_mode", JSON.stringify(data));

  return new Response("OK", { status: 200 });
}

export async function onRequestGet(context) {
  const { env } = context;
  const stored = await env.BEDTIME_KV.get("bedtime_mode");
  return new Response(stored ?? "{}", {
    headers: { "content-type": "application/json" },
  });
}