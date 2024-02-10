import React, { useState, useEffect } from 'react'

import Header from '../Header'
import Challenges from '../Challenges'
import Buttons from '../Buttons'
import Code from '../Code'
import Settings from '../Settings'
import { StateProvider } from '../../StateContext'
import "./App.css"

function App() {
    
  return (
    <StateProvider>
    <>
      <div>
        <Header />
        <Settings />
        <Challenges />
        <Code />
        <Buttons />
      </div>
    </>
    </StateProvider>
  )
}

export default App


