import { useState } from 'react'
import CodeBox from '../CodeBox'
import Console from '../Console'

import { useStateContext } from '../../StateContext'
import './Code.css'

const Code = () => {
  const { requestData } = useStateContext();

  return (
    <div id="Code">
      <CodeBox />
      <Console />
      <div className="stats">
        language: {requestData.language}<br />
        difficulty: {requestData.difficulty}<br />
        length: {requestData.length}
      </div>
    </div>
  )
}

export default Code