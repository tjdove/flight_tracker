import React, { ReactNode } from "react"
import { useState, useContext, createContext } from "react"

type CountContextType = {
  count: number
  setCount: React.Dispatch<React.SetStateAction<number>>
} | null

export const CountContext = createContext<CountContextType>(null)

export default function CountContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [count, setCount] = useState(0)

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  )
}
