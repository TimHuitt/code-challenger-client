import { useState } from 'react'
import CodeBox from '../CodeBox'
import Console from '../Console'

import { useStateContext } from '../../StateContext'
import './Code.css'

const Code = () => {
  const { requestData } = useStateContext();
  const [ logData, setLogData ] = useState([''])

  return (
    <div id="Code">
      <CodeBox setLogData={setLogData} logData={logData} />
      <Console logData={logData} />
      <div className="stats">
        language: {requestData.language}<br />
        difficulty: {requestData.difficulty}<br />
        length: {requestData.length}
      </div>
    </div>
  )
}

export default Code