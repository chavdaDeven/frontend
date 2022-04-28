import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";

import RenderOnAnonymous from "./components/RenderOnAnonymous";
import RenderOnAuthenticated from "./components/RenderOnAuthenticated";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <RenderOnAnonymous>
          <div className="App">NOT Authenticated yet!</div>
        </RenderOnAnonymous>
        <RenderOnAuthenticated>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </RenderOnAuthenticated>
      </div>
    </BrowserRouter>
  );
}

export default App;
