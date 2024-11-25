import { TodoTableInterface } from "./db/TodoTable";
import regex from "./regex";

export function ValidToDo(body: TodoTableInterface) {
    if (["default", "urgent", "critical"].includes(body.category) === false) return false
    if (typeof body.task !== "string" || body.task.length < 1) return false
    return true
}

export function ValidToDoUpdate(body: TodoTableInterface) {
    if (!body.id) return false
    const task: any = body.task
    if (task === undefined && body.category === undefined) {
        return false
    }
    if (typeof body.category === "string" && ["default", "urgent", "critical"].includes(body.category) == false) {
        return false
    }
    if (typeof task !== "string" && task.lenth < 1) {
        return false
    }
    return true
}

export function ValidToDoDelete(body: TodoTableInterface) {
    if (!body.id) return false
    return true
}