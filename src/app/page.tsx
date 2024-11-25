"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components.ts/Loader";
import "./login.css"
import regex from "@/lib/regex";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()
  const [feedback, setFeedback] = useState("")
  const emailRef: any = useRef(null)
  const passwordRef: any = useRef(null)
  const submit = async () => {
    try {
      setLoading(true)
      const [username, password]: any = [emailRef?.current?.value, passwordRef?.current?.value]
      if (username && regex.email.test(username) && password) {
        const loginCall = await fetch("/authentication", { method: "POST", body: JSON.stringify({ username, password }) })
        if (loginCall.status !== 200) {
          return setFeedback("Invalid Credentials")
        }
        setFeedback("")
        router.push('/dashboard')
      }
    } catch (error) {
      // implement logger
    }
    finally {
      setLoading(false)
    }

  }

  useEffect(()=>{
    validate()
  },[])

  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const validate = () => {
    const [username, password]: any = [emailRef?.current?.value, passwordRef?.current?.value]
    if (username && regex.email.test(username) && password) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }
  const checkSubmit = (e: any) => {
    try {
      if (e.key === "Enter") {
        submit()
      }
    } catch (error) {
      // implement logger
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <div className="login-background flex items-center justify-center">
      <div className="login-form w-[320px]">
        <h1 className="login-title inter-font">Welcome</h1>
        <div className="input-container flex flex-col">
          <label htmlFor="username">
            User
            {
              feedback.length > 0
                ? <span className="error-message"> Invalid User.</span>
                : null
            }
          </label>
          <input defaultValue="e@mail.com" id="username" ref={emailRef} onKeyDown={checkSubmit} onChange={validate} />
        </div>
        <div className="input-container flex flex-col">
          <label htmlFor="passwords">Password</label>
          <input type="password" defaultValue={"unsafe"} id="password" ref={passwordRef} onKeyDown={checkSubmit} onChange={validate} />
        </div>
        <div className="login-button">
          <button disabled={disabled} onClick={submit}>{
            loading ?
              <Loader className="loader login"/>
              :
              "Continue"
          }</button>

        </div>
      </div>
    </div>
  );
}
