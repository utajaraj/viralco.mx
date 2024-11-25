import db from "@/lib/db";
import { ValidToDo, ValidToDoUpdate } from "@/lib/validate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        if (ValidToDoUpdate(body)) {
            const { task, category, id } = body
            const newTask = await db.todo.update(id,task,category)
            return NextResponse.json({ message: "Todo updated", data: newTask})
        }
        return NextResponse.json("task and category are mandatory", { status: 400 })
    } catch (error) {
        console.log(error);
        
        return NextResponse.json("Error updating todo", { status: 500 })
    }
}