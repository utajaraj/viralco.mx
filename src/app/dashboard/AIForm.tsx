import { useRef } from "react"
import { Modal } from "../../../components.ts/Modal"
import { TodoEventManager } from "../Events"

export function AIForm({ setShowAIModal, aiIdeas, filter, setIdeas }: any) {

    const categoryRef = useRef(null)
    const submit = async (task: string) => {
        setIdeas(aiIdeas.filter((x:any)=>x!==task))
        const categoryElem: any = categoryRef.current
        if (categoryElem.value) {
            const addCall = await fetch("/api/todos/create", { method: "POST", body: JSON.stringify({ task, category: categoryElem.value }) })
            if (addCall.status === 200) {
                const addedData = await addCall.json()
                TodoEventManager.emit("add", addedData.data)
            }
        }
    }

    
    return (
        <Modal title="AI Todos" close={setShowAIModal}>
            <p className="ai-instructions">Click on the ideas you wish to add as todos, to the selected category.</p>
            <div className="add-todo-form">
                <div className="input-container">
                    <label htmlFor="todo-category">Category</label>
                    <select ref={categoryRef} defaultValue={filter.length > 0 ? filter : "default"} className="soft" id="todo-category">
                        <option value={"default"}>Default</option>
                        <option value={"critical"}>Critical</option>
                        <option value={"urgent"}>Urgent</option>
                    </select>
                </div>
                <div className="ideas">
                    <p>AI Ideas</p>
                    {
                        aiIdeas.map((idea: string, i: number) => {
                            return (
                                <p onClick={() => submit(idea)} className="idea" key={`idea-${i}`}>{idea}</p>
                            )
                        })
                    }
                </div>
            </div>
        </Modal>
    )

}