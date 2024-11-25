import { useRef } from "react"
import { Modal } from "../../../components.ts/Modal"
import { TodoEventManager } from "../Events"

export function TaskForm({ setShowAdd, filter }: any) {

    const [taskRef, categoryRef] = [useRef(null), useRef(null)]
    const submit = async () => {
        const [taskElem, categoryElem]: any = [taskRef.current, categoryRef.current]
        if (taskElem.value && categoryElem.value) {
            const addCall = await fetch("/api/todos/create", { method: "POST", body: JSON.stringify({ task: taskElem.value, category: categoryElem.value }) })
            if (addCall.status === 200) {
                const addedData = await addCall.json()
                TodoEventManager.emit("add", addedData.data)
                setShowAdd(false)
            }
        }
    }

    return (
        <Modal title="Add Todo" close={setShowAdd}>
            <div className="add-todo-form">
                <div className="input-container">
                    <label htmlFor="todo-task">What do you need to do?</label>
                    <input ref={taskRef} className="soft" id="todo-task" />
                </div>
                <div className="input-container">
                    <label htmlFor="todo-category">Category</label>
                    <select ref={categoryRef} defaultValue={filter.length > 0 ? filter : "default"} className="soft" id="todo-category">
                        <option value={"default"}>Default</option>
                        <option value={"critical"}>Critical</option>
                        <option value={"urgent"}>Urgent</option>
                    </select>
                </div>
                <button className="actionable" onClick={submit}>
                    Add
                </button>
            </div>
        </Modal>
    )

}