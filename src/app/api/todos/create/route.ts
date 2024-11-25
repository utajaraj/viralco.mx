import db from "@/lib/db";
import { ValidToDo } from "@/lib/validate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        
        if (ValidToDo(body)) {
            const { task, category } = body
            const newTask = await db.todo.create(task,category)
            return NextResponse.json({ message: "Todo created", data: newTask})
        }
        return NextResponse.json("task and category are mandatory", { status: 400 })
    } catch (error) {
        return NextResponse.json("Error creating todo", { status: 500 })
    }
}