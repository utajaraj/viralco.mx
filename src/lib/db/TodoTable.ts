import { randomUUID } from "crypto"
import { readFile, writeFile } from "fs/promises";
export interface TodoTableInterface {
    id: string,
    task: string,
    category: string,
}
const base = "./data.json"
let TodoIndexes: any = {}
const readData: any = async () => {
    const file = await readFile(base, "utf-8")
    const data = JSON.parse(file)
    return data
}
async function updateIndexes() {
    const data =  await readData()
    for (let index = 0; index < data.length; index++) {
        const task = data[index];
        TodoIndexes = {}
        TodoIndexes[task.id] = index
    }
}
export abstract class Todo {
    constructor() {
        updateIndexes()
    }
    todo = {
        getAll: async () => {
            return await readData()
        },
        create: async (task: string, category?: string) => {
            const id = randomUUID()
            const data = await readData()
            data.push({ id, task, category: category ?? "Default" })
            const done = await writeFile(base, JSON.stringify(data))
            return { id, task, category: category ?? "Default" }
        },
        delete: async (id: string) => {
            const data = await readData()
            const done = await writeFile(base, JSON.stringify(data.filter((x: any) => x.id !== id)))
            updateIndexes()
            return this.todo
        },
        update: async (id: string, newTask?: string, newCategory?: string) => {
            const index = TodoIndexes[id]
            const data = await readData()
            console.log(TodoIndexes, data, id);

            const { category, task } = data[index]
            data[index] = { id, task: newTask || task, category: newCategory || category }
            const done = await writeFile(base, JSON.stringify(data))
            return { id, task: newTask || task, category: newCategory || category }
        }
    }
}