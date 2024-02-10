import { useState } from 'react'
import './Console.css'

const Console = ({ logData }) => {
  const [ log, setLog ] = useState('')

  return (
    <div id="Console">
      <div id="console-text">
        {logData.map((line) => {
          return(
          <pre>{"> " + line}</pre>
          )
        })}
        <div id="console-entry">
          <input type='text' />
        </div>
      </div>
      <div id="console-label">
        <span>Console</span>
      </div>
    </div>
  )
}

export default Console