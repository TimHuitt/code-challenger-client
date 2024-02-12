import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

  export const StateProvider = ({ children }) => {

    const [ passing, setPassing ] = useState (true)

    const [ logData, setLogData ] = useState([''])

    const [ challengeToggle, setChallengeToggle ] = useState(true)

    const [ requestData, setRequestData ] = useState({
      'ID': [],
      'language': 'Python',
      'difficulty': 'beginner',
      'length': 'short',
      'request': ''
    })

    const [ showSettings, setShowSettings ] = useState(false)

    const [ challengeResponse, setChallengeResponse ] = useState({
      ID: '',
      name: 'Challenge',
      // challenge: '',
      challenge: `Click the cog to adjust challenge settings\n
Click "Next Challenge"\n
Add your code to the editor\n
Click Play to execute your code
      `,
      textHints: ['View general hints related to the generated challenge'],
      codeHints: ['View code specific hints related to the generated challenge'],
      // testCases: [["five","(Program should ask for input again)"], ["3.14", "(Program should ask for input again)"], ["10", "10"]],
      testCases: [
        ["examples of input", "expected output"]
      ],
      solution: "View the suggested solution if you get stuck"
    })

    const value = {
      passing,
      setPassing,
      logData,
      setLogData,
      challengeToggle,
      setChallengeToggle,
      requestData,
      setRequestData,
      showSettings,
      setShowSettings,
      challengeResponse,
      setChallengeResponse
    }

    return (
      <StateContext.Provider value={value}>
        {children}
      </StateContext.Provider>
    );
  };

  export const useStateContext = () => {
    return useContext(StateContext);
  };