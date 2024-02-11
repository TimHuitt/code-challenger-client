import { useState } from 'react'
import { useStateContext } from '../../StateContext'
import './Collapse.css'

import collapseSvg from '/public/collapse.svg'

const Collapse = () => {

  const { challengeToggle, setChallengeToggle } = useStateContext()

  return (
    <div id="Collapse">
      <div className="vertical-ruler" />
      <div className="collapse-container">
        <img src={collapseSvg} alt="collapse" />
      </div>
      <div className="vertical-ruler" />
    </div>
  )
}

export default Collapse