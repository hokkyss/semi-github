import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Search from "./Search";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search/:id" component={Search} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Welcome to semi-github by <code>react</code>.<br />
        This is the home page.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </div>
  );
};

export default App;
