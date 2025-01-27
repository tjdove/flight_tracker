import React, { useContext } from "react"
//import CountContextProvider, { CountContext } from CountContextReducer
import CountContextReducer, {
  CountContext,
} from "../context/CountContextReducer"

function Counter() {
  var context
  try {
    context = useContext(CountContext)
  } catch (e) {
    console.log(e)
  }
  if (!context) {
    throw new Error("CountContext must be used within a CountContextProvider")
  }

  const { state, dispatch } = context

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <button onClick={() => dispatch({ type: "SET_COUNT", payload: 10 })}>
        Set Count to 10
      </button>
    </div>
  )
}

export default function Home() {
  return (
    <CountContextReducer>
      <Counter />
    </CountContextReducer>
  )
}
