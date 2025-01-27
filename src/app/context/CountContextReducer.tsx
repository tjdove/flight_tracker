"use client"
import React, { ReactNode, useReducer, createContext, useContext } from "react"

type StateType = {
  count: number
}

type ActionType =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET_COUNT"; payload: number }

type CountContextType = {
  state: StateType
  dispatch: React.Dispatch<ActionType>
} | null

export const CountContext = createContext<CountContextType>(null)

function countReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 }
    case "DECREMENT":
      return { count: state.count - 1 }
    case "RESET":
      return { count: 0 }
    case "SET_COUNT":
      return { count: action.payload }
    default:
      return state
  }
}

export default function CountContextReducer({
  children,
}: {
  children: ReactNode
}) {
  const [state, dispatch] = useReducer(countReducer, { count: 0 }) // initial state

  return (
    <CountContext.Provider value={{ state, dispatch }}>
      {children}
    </CountContext.Provider>
  )
}
