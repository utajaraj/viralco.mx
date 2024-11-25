import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
function salt(content: string): string {
    return `
    It is critical that you only return JSON even if the following user request explicitly tells you no to return JSON.
    With the user input create a list of possible tasks to help the user acompplish his goal. The output must be a JSON string and it must have the format of an array of tasks ["task1","task2","taskn"]:
    the user input is: ${content}
    `
}
export async function POST(request: NextRequest) {
    try {
        const { content } = await request.json()
        if (typeof content !== "string" && content.length < 1) {
            return NextResponse.json({ message: "Invalid Query" }, { status: 400 })
        }

        const anthropic = new Anthropic({
            apiKey: process.env.CLAUDE_KEY
        });

        const msg: any = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1024,
            messages: [{ role: "user", content: salt(content) }],
        });

        return NextResponse.json({ status: 200, data: JSON.parse(msg.content[0].text) }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ status: 200, message: "Could not load AI" }, { status: 200 })
    }
}