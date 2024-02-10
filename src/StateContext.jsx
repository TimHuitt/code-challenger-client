import React, { createContext, useContext, useState } from 'react';

  const StateContext = createContext();

  export const StateProvider = ({ children }) => {

    const [ requestData, setRequestData ] = useState({
      'ID': [],
      'language': 'Python',
      'difficulty': 'beginner',
      'length': 'short',
      'request': ''
    })

    const [ showSettings, setShowSettings ] = useState(false)

    const [ challengeResponse, setChallengeResponse ] = useState({
      ID: 'py_beg_short_find_max_number',
      name: 'Challenge',
      challenge: `
Click the cog to adjust challenge settings\n
Click "New Challenge"\n
Add your code to the code editor\n
Click run to execute your code
      `,
      textHints: ['View general hints related to the generated challenge'],
      codeHints: ['View code specific hints related to the generated challenge'],
      testCases: [["five","(Program should ask for input again)"], ["3.14", "(Program should ask for input again)"], ["10", "10"]],
      // testCases: [
      //   "Test cases and examples of expected input/output"
      // ],
      solution: "View the suggested solution if you get stuck"
    })

    const value = {
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