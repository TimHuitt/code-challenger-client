import React, { useState, useEffect } from 'react'
import { useStateContext } from '../../StateContext'

import Header from '../Header'
import Challenges from '../Challenges'
import Code from '../Code'
import Settings from '../Settings'
import Collapse from '../Collapse'

import "./App.css"

function App() {
  const { challengeToggle, setChallengeToggle } = useStateContext()
  const [ colWidth, setColWidth ] = useState('')

  const getWidth = (size) => {
    const [width, setWidth] = useState(0)
    
    useEffect(() => {
      function handleResize() {
        setWidth(window.innerWidth)
      }
      window.addEventListener("resize", handleResize)
      handleResize()
      return () => { 
        window.removeEventListener("resize", handleResize)
      }
    }, [setWidth])
    return width
  }

  const wide = getWidth(600)

  useEffect(() => {
    challengeToggle
      ? wide > 600 ? setColWidth('32% 5% 60%') : setColWidth('93% 5% 0%')
      : setColWidth('0% 5% 93%')
  },[challengeToggle])

  useEffect(() => {
    setColWidth('32% 5% 60%')
  },[])


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


