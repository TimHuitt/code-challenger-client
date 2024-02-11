import { useState, useEffect } from 'react'
import { useStateContext } from '../../StateContext'
import './Collapse.css'

import collapseSvg from '/public/collapse.svg'

const Collapse = () => {

  const { challengeToggle, setChallengeToggle } = useStateContext()
  const [ rotation, setRotation ] = useState(180)

  const handleClick = () => {
    setChallengeToggle(prev => !prev)
  }

  useEffect(() => {
    challengeToggle
      ? setRotation(180)
      : setRotation(0)
  }, [challengeToggle])

  return (
    <div id="Collapse">
      <div className="vertical-ruler" />
      <div className="collapse-container">
        <img src={collapseSvg} alt="collapse" style={{ transform: `rotate(${rotation}deg)` }} onClick={handleClick} />
      </div>
      <div className="vertical-ruler" />
    </div>
  )
}

export default Collapse