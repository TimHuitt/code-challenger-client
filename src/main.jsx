import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/App"
import { BrowserRouter as Router } from "react-router-dom"
import { StateProvider } from './StateContext'
import ReactGA from 'react-ga4'

ReactGA.initialize("G-EVH9V7EX44")

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <StateProvider>
        <App />
    </StateProvider>
  </Router>,
)
