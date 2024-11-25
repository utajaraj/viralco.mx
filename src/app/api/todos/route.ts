import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    const data = await db.todo.getAll()
    return NextResponse.json({ message: "Todos retreived", data }, { status: 200 })
}