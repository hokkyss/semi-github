import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { React } from "react";
import Navbar from "./Navbar";
import SearchResult from "./SearchResult";
import RepositoryDetail from "./RepositoryDetail";
import Copyright from "./Copyright";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/repo" component={RepositoryDetail} />
          <Route path="/search/:query" component={SearchResult} />
          <Route path="/" exact component={Home} />
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
        <Copyright />
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Welcome to semi-github by <code>react</code>. This is the home page.
        <br />
        This project is inspired from my friend's project in{" "}
        <a href="https://graciellavl-github.netlify.app/">this link.</a>
      </p>
      <br />
      <br />
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
