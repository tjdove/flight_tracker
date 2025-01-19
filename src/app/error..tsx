"use client"

import React from "react"

type ErrorProps = {
  error: Error
  reset: () => void
}

const GlobalError: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <html>
      <head>
        <title>Application Error</title>
      </head>
      <body>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h1>Something went wrong!</h1>
          <p>{error.message}</p>
          <button
            onClick={reset}
            style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}

export default GlobalError
