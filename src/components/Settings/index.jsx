
import { useStateContext } from '../../StateContext';
import languages from '../../../public/languages.json'
import './Settings.css'


const Settings = () => {
  const { requestData, setRequestData } = useStateContext();
  const { showSettings, setShowSettings } = useStateContext();
  const hidden = showSettings ? 'block' : 'none'
  

  const handleCancel = () => {
    setShowSettings(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const language = e.target.form.language.value
    const difficulty = e.target.form.difficulty.value
    const length = e.target.form.length.value
    const request = e.target.form.request.value

    setRequestData({
      'ID': [],
      'language': language,
      'difficulty': difficulty,
      'length': length,
      'request': request
    })

    setShowSettings(false)
  }

  return (
    <div className="Settings" style={{ display: hidden }}>
      <form className="settings-container">
        <h1>Challenge Settings</h1>
  
        <div className="settings-language">
          <label htmlFor="language">Language</label>
          <select id="language" name="language">
            { languages.map((language) =>
              <option value={language}>{language}</option>
            )}
          </select>
        </div>
  
        <div className="settings-difficulty">
          <label htmlFor="difficulty">Difficulty</label>
          <select id="difficulty" name="difficulty">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>
  
        <div className="settings-length">
          <label htmlFor="length">Length of Your Solution</label>
          <select id="length" name="length">
            <option value="one-liner">One-liner</option>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
  
        <div className="settings-request">
          <label htmlFor="request">Request</label>
          <textarea id="request" name="request" rows="4" cols="50" placeholder='ie: something with a matrix'></textarea>
        </div>
        <small>Reminder:<br/>Challenges, evaluations, and console output are 100% AI driven<br/>You may encounter inaccuracies or miscalculations</small>
        <div className="settings-buttons">
          <button type="submit" onClick={ handleSubmit }>Save Settings</button>
          <button type="button" onClick={ handleCancel }>Cancel</button>
        </div>
      </form>
    </div>
  )  
}

export default Settings