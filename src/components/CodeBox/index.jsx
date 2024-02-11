import './prism.css';
import './CodeBox.css'
import React, { useRef } from 'react'
import Prism from 'prismjs'
import Editor from 'react-simple-code-editor';
import { useStateContext } from '../../StateContext';
import { Tooltip } from 'react-tooltip'

import playSvg from '/play.svg'
import checkSvg from '/check.svg'
import wrongSvg from '/wrong.svg'

const CodeBox = () => {
  const { challengeResponse, requestData, logData, setLogData, passing, setPassing } = useStateContext();
  const textRef = useRef(null)

  const [code, setCode] = React.useState(
    `console.log('Welcome!')
  console.log('write some code here')
    console.log('write some more code here')`
  );

  const sendRequest = async () => {

    const url = "https://code-challenger-server-9e5cc705b6e9.herokuapp.com/console";

    const textareaElement = textRef.current;
    const lines = textareaElement.props.value.split('\n');
    let formattedCode = lines.map(line => line.trimEnd()).join('\n');
    
    console.log(requestData.language, challengeResponse.challenge, formattedCode)
    
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

  const isPassing = (codeEval) => {
    return codeEval
  }

  const handleRun = async () => {

    try {
      const resData = await sendRequest();
      if (resData) {
        console.log(resData)
        if (typeof resData.response === 'string') {
          const codeState = JSON.parse(resData.response).eval
            ? ['Correct!']
            : ['Incorrect!']

          setPassing(JSON.parse(resData.response).eval)
          setLogData(logData.concat(codeState, JSON.parse(resData.response).output))
        } else {

          const codeState = resData.response.eval
            ? ['Correct!']
            : ['Incorrect!']

          setPassing(resData.response.eval)
          setLogData(logData.concat(codeState, resData.response.output))
        }
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