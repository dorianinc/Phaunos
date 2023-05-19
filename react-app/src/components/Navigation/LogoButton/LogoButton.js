import logo from "./logos/logo-green2.png"
import "./LogoButton.css"

function LogoButton() {
  
    return (
      <div className="logoContainer">
          <img className ="logo" alt="phaunos"  src={logo}/>
          <p className="title">Phaunos</p>
      </div>
    );
    
  }
  
  export default LogoButton;
  