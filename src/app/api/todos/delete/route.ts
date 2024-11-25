import db from "@/lib/db";
import { ValidToDo, ValidToDoDelete, ValidToDoUpdate } from "@/lib/validate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        if (ValidToDoDelete(body)) {
            const { id } = body
            db.todo.delete(id)
            return NextResponse.json({ message: "Todo deleted", data: { id } })
        }
        return NextResponse.json("task and category are mandatory", { status: 400 })
    } catch (error) {
        return NextResponse.json("Error creating todo", { status: 500 })
    }
}