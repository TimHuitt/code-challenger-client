import { useState, useEffect } from 'react'
import { useStateContext } from '../../StateContext';
import './Buttons.css'
import nextSvg from '../../../public/next.svg'

const Buttons = () => {
  

  return (
    <div id="Buttons">
      <div id="buttons-container">
        <div id="buttons-challenges">
          {/* <button>General Hint</button>
          <button>Code Hint</button> */}
          <button onClick={getChallenge}>
            <img src={nextSvg} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Buttons