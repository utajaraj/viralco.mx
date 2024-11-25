"use client"

import { TodoTableInterface } from "@/lib/db/TodoTable"
import { useEffect, useState } from "react"
import { TodoEventManager } from "../Events"
import { capitalize } from "@/lib/capitalize"
import { BiCheck, BiEdit } from "react-icons/bi"

export default function Dashboard() {
    const [todos, setTodos] = useState({})
    async function loadTodos() {
        const todosCall = await fetch("/api/todos")
        if (todosCall.status === 200) {
            const todoData = await todosCall.json()
            const newTodos: any = {}
            for (let index = 0; index < todoData.data.length; index++) {
                const { category, id, task } = todoData.data[index];
                if (newTodos[category] === undefined) {
                    newTodos[category] = []
                }
                newTodos[category].push({ task, id })
            }
            setTodos(newTodos)
        }
    }
    const [filter, setFilter] = useState("")
    useEffect(() => {
        TodoEventManager.addListener("add", (item) => {
            const items: any = { ...todos }
            const { category, task, id } = item
            if (items[category] === undefined) {
                items[category] = []
            }
            items[category].push({ task, id })
            setTodos(items)
        })
        TodoEventManager.addListener("filter", (item) => {
            setFilter(item)
        })
        return () => {
            TodoEventManager.removeAllListeners()
        }
    }, [todos])
    useEffect(() => {
        loadTodos()
    }, [])

    const remove = async (id: string, category: string) => {
        const deleteCall = await fetch("/api/todos/delete", { method: "POST", body: JSON.stringify({ id }) })
        if (deleteCall.status === 200) {
            const newData: any = { ...todos }
            const newItems = []
            for (let index = 0; index < newData[category].length; index++) {
                const catItem = newData[category][index];
                if (catItem.id !== id) {
                    newItems.push(catItem)
                    continue
                }
            }
            newData[category] = newItems
            if (newData[category].length === 0) delete newData[category]
            setTodos(newData)
        }
    }

    const update = async (e: any, id: string) => {
        const newTask = e.target.outerText
        fetch("/api/todos/update", { method: "POST", body: JSON.stringify({ id, task: newTask }) })
    }
    return (
        <div className="todos">
            {
                Object.keys(todos).map((category, i: number) => {
                    if (filter && filter !== category) return null
                    const todosByCategory: any = todos
                    const items = todosByCategory[category]
                    return (
                        <div className="todo-category" key={`todo-cat-${i}`}>
                            <h1>{capitalize(category)}</h1>
                            <div className="todo-items">
                                {
                                    items.map((item: TodoTableInterface, i: number) => {
                                        return (
                                            <div className="todo" key={`todo-key-${i}`}>
                                                <h2 contentEditable={true} onBlur={(e) => { update(e, item.id) }}>{item.task}</h2>
                                                <div className="actions">
                                                    <BiCheck onClick={(e) => {
                                                        remove(item.id, category)
                                                    }} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}