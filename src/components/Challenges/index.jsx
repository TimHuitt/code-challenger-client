import { useState, useEffect } from 'react'
import { useStateContext } from '../../StateContext';
import Container from '../Container'
import './Challenges.css'

const Challenges = () => {

  const { challengeResponse } = useStateContext();
  
  const currentChallenge = challengeResponse.challenge 
    ? challengeResponse.challenge
    : `Click the cog to adjust challenge settings\n
Click "New Challenge"\n
Add your code to the code editor\n
Click run to execute your code
`
  return (
    <div id="Challenges">
      <Container header={challengeResponse.name} body={challengeResponse.challenge} />
      <Container header={'Test Cases'} body={challengeResponse.testCases} />
      <Container header={'Hints'} body={[challengeResponse.textHints, challengeResponse.codeHints, challengeResponse.solution]} />
    </div>
  )
}

export default Challenges
