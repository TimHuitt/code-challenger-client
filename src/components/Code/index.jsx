import { useState } from 'react'
import CodeBox from '../CodeBox'
import Console from '../Console'

import './Code.css'

const Code = () => {

  const [ logData, setLogData ] = useState([''])

  return (
    <div id="Code">
      <CodeBox setLogData={setLogData} logData={logData} />
      <Console logData={logData} />
    </div>
  )
}

export default Code