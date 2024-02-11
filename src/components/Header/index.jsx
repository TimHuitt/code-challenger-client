import './Header.css'
import brainSvg from '/code-brain.svg'

const Header = () => {
  return (
    <div id="Header">
      <div id="header-left">
        <img src={brainSvg} />
        <p>
          CodeChallenger
        </p>
      </div>
      <div id="header-right">
        <small>Where the AI tells <b><u>you</u></b> what to do</small>
        {/* <div id="user-icon">
          <p>User</p>
        </div> */}
      </div>
    </div>
  )
}

export default Header