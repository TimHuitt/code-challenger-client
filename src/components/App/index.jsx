import React, { useState, useEffect } from 'react'
import { useStateContext } from '../../StateContext'

import Header from '../Header'
import Challenges from '../Challenges'
import Code from '../Code'
import Settings from '../Settings'
import Collapse from '../Collapse'

import "./App.css"

function App() {
  const { challengeToggle } = useStateContext()
  const [ colWidth, setColWidth ] = useState('30% 5% 60%')
  
  useEffect(() => {
    challengeToggle
      ? setColWidth('32% 5% 60%')
      : setColWidth('0% 5% 93%')
  },[challengeToggle])

  return (
    <div className='App'>
      <Header />
      <Settings />
      <div 
        className="content"
        style={{
          gridTemplateColumns: colWidth
        }}>
        <Challenges />
        <Collapse />
        <Code />
      </div>
    </div>
  )
}

export default App


