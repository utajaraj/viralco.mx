"use client"
import { useEffect, useRef, useState } from "react";
import "./dashboard.css"
import { TaskForm } from "./AddTaskForm";
import { TodoEventManager } from "../Events";
import { capitalize } from "@/lib/capitalize";
import { BiBrain } from "react-icons/bi";
import { AIForm } from "./AIForm";
import Loader from "../../../components.ts/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showAdd, setShowAdd] = useState(false)
  const [filter, setFilter] = useState("")
  const [content, setContent] = useState("")
  const [aiIdeas, setAIIdeas] = useState([])
  const [loading, setLoading] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)
  const searchRef = useRef(null)
  const handleInputChange = (event: any) => {
    setContent(event.target.value)
  }

  const callAI = async () => {
    const elem: any = searchRef.current
    elem.blur()
    const dataCall = await fetch(`/api/ai`, { method: "POST", body: JSON.stringify({ content }) })
    if (dataCall.status === 200) {
      const aiData = await dataCall.json()
      setAIIdeas(aiData.data)
      setShowAIModal(true)
    }
    setLoading(false)
  }

  useEffect(() => {

    const timeOut = setTimeout(() => {
      if (content.length > 0) {
        setLoading(true)
        callAI()
      }
    }, 500);

    return () => {
      clearTimeout(timeOut)
    }

  }, [content])
  const filterTodos = (category: string) => {
    setFilter(category === filter ? "" : category)
    TodoEventManager.emit("filter", category === filter ? "" : category)
  }
  const ai = () => {
    if (loading === false && aiIdeas.length > 0) setShowAIModal(true)
    const elem: any = searchRef.current
    elem.focus()
    return false
  }
  return (
    < div className="dashboard-layout" >
      <div className="footer"></div>
      <div className="circle-1"></div>
      <div className="navigation">
        <div className="navigation-categories">
          {
            ["default", "critical", "urgent"].map((category: string, i: number) => {
              return (
                <p className={`filter ${category === filter ? "selected" : ""}`} key={`nav-${i}`} onClick={() => filterTodos(category)}>{capitalize(category)}</p>
              )
            })
          }
        </div>
        <div className="add-container">
          <button className="actionable" onClick={() => setShowAdd(true)}>Add Todo</button>
        </div>
        <div className="w-[100%] ai-container">
          <input placeholder="What do you need?" disabled={loading} ref={searchRef} className="ai soft" onChange={handleInputChange} />
          <div className={`brain ${loading ? " animated" : ""}`} onClick={ai} >
            <BiBrain />
          </div>
        </div>
      </div>
      <div className="content">
        {children}
      </div>
      {
        showAIModal ?
          <AIForm setShowAIModal={setShowAIModal} aiIdeas={aiIdeas} filter={filter} setIdeas={setAIIdeas} />
          : null
      }
      {
        showAdd ?
          <TaskForm setShowAdd={setShowAdd} filter={filter} />
          : null
      }
    </div >
  );
}
