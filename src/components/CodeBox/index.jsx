import './prism.css';
import './CodeBox.css'
import React, { useState, useEffect, useRef } from 'react'
import Prism from 'prismjs'
import Editor from 'react-simple-code-editor';
import { useStateContext } from '../../StateContext';
import { Tooltip } from 'react-tooltip'

import playSvg from '/play.svg'
import checkSvg from '/check.svg'
import wrongSvg from '/wrong.svg'

const CodeBox = () => {
  const [ disabled, setDisabled ] = useState(false)
  const [ count, setCount ] = useState(0)
  const { challengeResponse, requestData, logData, setLogData, passing, setPassing } = useStateContext();
  const textRef = useRef(null)

  const [code, setCode] = React.useState(
    `console.log('Welcome!')
console.log('Generate a new challenge to get started')
console.log('Click the Play button to evaluate -->')`
  );

  useEffect(() => {
    if (count) {
      setCode('')
    } 
    setCount(1)
  },[logData])


  const sendRequest = async () => {

    const url = "https://code-challenger-server-9e5cc705b6e9.herokuapp.com/console";

    const textareaElement = textRef.current;
    const lines = textareaElement.props.value.split('\n');
    let formattedCode = lines.map(line => line.trimEnd()).join('\n');
    
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({content: `language: ${requestData.language}, Challenge: ${challengeResponse.challenge}, Code: ${formattedCode}`}),
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

  const handleRun = async () => {

    try {
      const resData = await sendRequest();
      if (resData) {
        const response = typeof resData.response === 'string' 
          ? JSON.parse(resData.response)
          : resData.response

        const codeState = response.eval
          ? ['Correct!']
          : ['Incorrect!']

        setPassing(response.eval)
        setLogData(prev => [...prev, ...response.output, ...codeState])
        
      } else {
        console.log('no data')
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="CodeBox">
      <div className="editor-container">
        <Editor
          ref={textRef}
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => Prism.highlight(code, Prism.languages.js)}
          padding={10}
          style={{
            minHeight: '100%',
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            borderBottom: '2px',
            borderRadius: '10px 10px 0 0',
          }}
        />
      </div>
      <div id="run-button-container">
        <div id="run-button" onClick={handleRun}  data-tooltip-id="eval" data-tooltip-content="Run and Evaluate">
          <img src={playSvg} />
        </div>
      </div>
      <div id="eval-container">
        {/* <img src={wrongSvg} alt="Incorrect Solution" /> */}
        <div className="eval-wrapper">
          { passing ? (
            <div className="correct" data-tooltip-id="correct" data-tooltip-content="Challenge Complete!">
              <img src={checkSvg} alt="Challenge Complete!" />
            </div>
          ) : (
            <div className="wrong" data-tooltip-id="wrong" data-tooltip-content="Challenge Incomplete">
              <img src={wrongSvg} alt="Incorrect Solution" />
            </div>
          )}
        </div>
      </div>
      <div className="code-bg"></div>
      <Tooltip id="eval"  />
      <Tooltip id="correct"  />
      <Tooltip id="wrong"  />
    </div>
  )
}

export default CodeBox