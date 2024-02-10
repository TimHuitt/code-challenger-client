import { useState, useEffect } from 'react'
import { useStateContext } from '../../StateContext';
import './Buttons.css'

const Buttons = () => {
  
  const { requestData, setRequestData } = useStateContext();
  const { setChallengeResponse } = useStateContext();
  
  
  const sendRequest = async () => {
    const url = "http://localhost:4000/challenges";
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

  return (
    <div id="Buttons">
      <div id="buttons-container">
        <div id="buttons-challenges">
          {/* <button>General Hint</button>
          <button>Code Hint</button> */}
          <button onClick={getChallenge}>New Challenge</button>
        </div>
        {/* <div id="buttons-code">
          <button>Give Up</button>
        </div> */}
      </div>
    </div>
  )
}

export default Buttons