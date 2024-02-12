import { useState, useEffect } from 'react'
import { useStateContext } from '../../StateContext'
import { Tooltip } from 'react-tooltip'
import './Collapse.css'

import nextSvg from '/next.svg'
import collapseSvg from '/collapse.svg'

const Collapse = () => {
  const [ disabled, setDisabled ] = useState(false)
  const { setChallengeResponse, challengeToggle, setChallengeToggle, setShowSettings, requestData, setLogData, setPassing } = useStateContext()
  const [ rotation, setRotation ] = useState(180)

  const openSettings = () => {
    setShowSettings(true)
  }
  
  const sendRequest = async () => {
    // https://code-challenger-server.fly.dev/
    // https://code-challenger-server-9e5cc705b6e9.herokuapp.com/
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

    if (disabled) {
      console.error('Please wait for the current request.');
      return;
    }

    setChallengeResponse({
      ID: '',
      name: 'Loading...',
      // challenge: '',
      challenge: '',
      textHints: [''],
      codeHints: [''],
      testCases: [
        ['']
      ],
      solution: ''
    })
    setPassing(false)
    setLogData([''])
    setDisabled(true)
    setLogData([
      '',
      'Your request has been sent', 
      '',
      'Please wait while AI generates a new challenge',
      '',
      'This may take 1-2 min for complex challenges'
    ])

    try {
      const resData = disabled ? false : await sendRequest();
      
      if (resData) {
        setPassing(false)
        if (typeof resData.response === 'string') {
          setChallengeResponse(JSON.parse(resData.response))
        } else {
          setChallengeResponse(resData.response)
        }
      } else {
        setLogData(['There was a communication error.', 'Please try again...'])
        console.error('No data. Try again...')
      }
    } catch (err) {
      console.log('Error: ' + err);
    } finally {
      setDisabled(false)
      setLogData([''])
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

  const nextButton = disabled ? "next-container disabled" : "next-container"

  return (
    <div id="Collapse">
      <div className="settings-button" onClick={openSettings} data-tooltip-id="settings" data-tooltip-content="Update Settings">
        <img src="/cog.svg" />
      </div>
      <div className="vertical-ruler" />
      <div className="collapse-container">
        <img src={collapseSvg} alt="collapse" style={{ transform: `rotate(${rotation}deg)` }} onClick={handleClick} data-tooltip-id="collapse" data-tooltip-content="Toggle Details" />
      </div>
      <div className="vertical-ruler" />
      <div className={nextButton}>
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