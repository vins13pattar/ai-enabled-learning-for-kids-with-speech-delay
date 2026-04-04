import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";
import { z } from "zod";
import { COMPANION_SYSTEM_PROMPT } from "@/lib/companion-prompt";

const bodySchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    }),
  ),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return Response.json({ error: "Expected JSON body" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Invalid body", details: parsed.error.flatten() }, { status: 400 });
  }

  const { messages } = parsed.data;
  const trimmed = messages
    .map((m) => ({ ...m, content: m.content.trim() }))
    .filter((m) => m.content.length > 0);

  if (trimmed.length === 0) {
    return Response.json({ error: "messages must not be empty" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(
      "I’m here to cheer you on! This demo needs OPENAI_API_KEY on the server for live replies. Until then, try saying a word that starts with S together!",
      { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  const openai = createOpenAI({
    apiKey,
    ...(process.env.OPENAI_BASE_URL ? { baseURL: process.env.OPENAI_BASE_URL } : {}),
  });

  const modelMessages: ModelMessage[] = trimmed.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: COMPANION_SYSTEM_PROMPT,
    messages: modelMessages,
    maxOutputTokens: 256,
    temperature: 0.7,
  });

  return result.toTextStreamResponse();
}
