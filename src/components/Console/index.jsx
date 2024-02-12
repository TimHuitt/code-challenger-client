import { useEffect } from 'react'
import { useStateContext } from '../../StateContext'
import './Console.css'

const Console = () => {
  const { logData, setChallengeResponse, challengeToggle, setChallengeToggle, setShowSettings, requestData, setLogData, setPassing } = useStateContext()

  useEffect(() => {
    
  },[logData])

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      setLogData(prevData => [...prevData].concat(e.target.value) )
      e.target.value = ''
    }
  }

  return (
    <div id="Console">
      <div id="console-text">
        {logData.map((line) => {
          return(
          <pre>{"> " + line}</pre>
          )
        })}
        <div id="console-entry">
          <input type='text' placeholder='' onKeyDown={handleKey} />
        </div>
      </div>
      {/* <div id="console-label">
        <span>Console</span>
      </div> */}
    </div>
  )
}

export default Console