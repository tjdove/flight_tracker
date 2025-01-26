// app/page.tsx
import React from "react"
import { useState } from "react"
const CountContext = React.createContext(0)

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="container mx-auto">
      <ExampleComp1 />
      <ExampleComp2 />
    </main>
  )
}

export function ExampleComp1() {
  return <div>Example 1</div>
}

export function ExampleComp2() {
  return <div>Example 2</div>
}
