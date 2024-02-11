import { useState, useEffect } from 'react'
import { useStateContext } from '../../StateContext'
import { Tooltip } from 'react-tooltip'
import './Collapse.css'

import nextSvg from '../../../public/next.svg'
import collapseSvg from '/public/collapse.svg'

const Collapse = () => {

  const { challengeToggle, setChallengeToggle } = useStateContext()
  const [ rotation, setRotation ] = useState(180)

  const { requestData } = useStateContext();
  const { setChallengeResponse } = useStateContext();

  const { setShowSettings } = useStateContext();

  const openSettings = () => {
    setShowSettings(true)
  }
  
  
  const sendRequest = async () => {
    const url = "https://code-challenger-server-9e5cc705b6e9.herokuapp.com/challenges";
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({content: requestData}),
      });
  
      if (res.ok) {
        const jsonData = await res.json();
        return jsonData;
      } else {
        throw new Error("Invalid request!");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  
  const getChallenge = async () => {
    try {
      const resData = await sendRequest();
  
      if (resData) {
        if (typeof resData.response === 'string') {
          setChallengeResponse(JSON.parse(resData.response))
        } else {
          setChallengeResponse(resData.response)
        }
      } else {
        console.log('no data')
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      <div className="settings-button" onClick={openSettings} data-tooltip-id="settings" data-tooltip-content="Update Settings">
        <img src="/cog.svg" />
      </div>
      <div className="vertical-ruler" />
      <div className="collapse-container">
        <img src={collapseSvg} alt="collapse" style={{ transform: `rotate(${rotation}deg)` }} onClick={handleClick} data-tooltip-id="collapse" data-tooltip-content="Hide Details" />
      </div>
      <div className="vertical-ruler" />
      <div className="next-container">
        <button onClick={getChallenge} data-tooltip-id="next" data-tooltip-content="Next Challenge">
          <img src={nextSvg} />
        </button>
      </div>
      <Tooltip id="settings" />
      <Tooltip id="collapse" />
      <Tooltip id="next" />
    </div>
  )
}

export default Collapse