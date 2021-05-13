import "./SearchResult.css";
import "./index.css";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SearchResult({ match }) {
  const [repositories, setRepositories] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchRepositories();
    // fetchRepo();
  }, [match.params.repository]);

  const url = `https://api.github.com/search/repositories?q=${match.params.repository}`;
  const config = { method: "GET" };

  const fetchRepositories = () => {
    fetch(url, config)
      .then((response) => response.json())
      .then((result) => {
        setCount(result.total_count);
        setRepositories(result.items);
      })
      .catch((error) => console.log(error));
  };
  /*
  const fetchRepo = async () => {
    const result = await (await fetch(url, config)).json();
    setCount(result.total_count);
    setRepositories(result.items);
  };
  */
  console.log(repositories);
  console.log(count);
  return (
    <div className="container">
      <div className="left-container">
        <p>A</p>
      </div>
      <div className="right-container">
        <Link to="/repo/EntelectChallenge/2020-Overdrive/">B</Link>
      </div>
    </div>
  );
}

export default SearchResult;
