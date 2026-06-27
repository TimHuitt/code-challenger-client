import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/App"
import { BrowserRouter as Router } from "react-router-dom"
import { StateProvider } from './StateContext'

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <StateProvider>
        <App />
    </StateProvider>
  </Router>,
)
