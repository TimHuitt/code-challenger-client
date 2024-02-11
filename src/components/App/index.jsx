import React, { useState, useEffect } from 'react'
import { StateProvider } from '../../StateContext'

import Header from '../Header'
import Challenges from '../Challenges'
import Buttons from '../Buttons'
import Code from '../Code'
import Settings from '../Settings'
import Collapse from '../Collapse'

import "./App.css"

function App() {
    
  return (
    <StateProvider>
    <>
      <div>
        <Header />
        <Settings />
        <Challenges />
        <Collapse />
        <Code />
        <Buttons />
      </div>
    </>
    </StateProvider>
  )
}

export default App


