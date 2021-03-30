import "./App.css";
import svg from "./branding.svg";

function App() {
  return (
    <div className="App">
      <div className="Header">
        <div className="logo">
          <div>
            <img src={svg} alt=""></img>
          </div>
          &nbsp;&nbsp;new Meta
        </div>
        <div className="title">뉴 메타</div>
        <div className="button">
          <div>Login</div>
          <div>Sign Up</div>
        </div>
      </div>

      <div className="Content">
        <div>new META 에 오신걸 환영합니다!</div>
        <div>Coming soom ...</div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
