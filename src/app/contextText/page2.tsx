"use client"
import CountContextProvider, {
  CountContext,
} from "../context/CountContextProvider"

import { useState, useContext, createContext } from "react"

export default function Home() {
  return (
    <main className="container mx-auto">
      <CountContextProvider>
        <ExampleComp1 />
        <ExampleComp2 />
      </CountContextProvider>
    </main>
  )
}

export function ExampleComp1() {
  const { count, setCount } = useContext(CountContext)!
  console.log("Ex1 Rendering...")
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <h1>Example 1:{count}</h1>
    </div>
  )
}

export function ExampleComp2() {
  console.log("Ex2 Rendering...")
  return <div>Example 2</div>
}
