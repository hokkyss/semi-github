import "./SearchResult.css";
import "./index.css";
import { React, useState, useEffect, useCallback } from "react";
import { GoRepo, GoStar } from "react-icons/go";
import { FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function SearchResult({ match }) {
  const [repositories, setRepositories] = useState([]);
  const [count, setCount] = useState(0);

  const dateString = (date) => {
    date = new Date(date);
    const year = date.getYear();
    const month = date.getMonth();
    const day = date.getDate();

    var month_name = "";
    if (month === 0) month_name = "January";
    else if (month === 1) month_name = "February";
    else if (month === 2) month_name = "March";
    else if (month === 3) month_name = "April";
    else if (month === 4) month_name = "May";
    else if (month === 5) month_name = "June";
    else if (month === 6) month_name = "July";
    else if (month === 7) month_name = "August";
    else if (month === 8) month_name = "September";
    else if (month === 9) month_name = "October";
    else if (month === 10) month_name = "November";
    else if (month === 11) month_name = "December";

    return day + " " + month_name + " " + year;
  };

  const fetchRepo = useCallback(async (query) => {
    const url = `https://api.github.com/search/repositories?q=${query}`;
    const config = {
      method: "GET",
      headers: { authorization: "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" },
    };
    const result = await (await fetch(url, config)).json();
    setCount(result.total_count);
    setRepositories(result.items);
  }, []);

  useEffect(() => {
    fetchRepo(match.params.query);
  }, [fetchRepo, match.params.query]);

  return (
    <div className="container">
      <div className="left-container">
        <div className="choice">Repositories</div>
        <div className="choice">Users</div>
      </div>
      <div className="right-container">
        <div className="repo-num">
          Showing {count} available repository results
        </div>
        {repositories.map((repo) => (
          <div className="repo">
            <div className="repo-left">
              <GoRepo size={17} />
            </div>
            <div className="repo-right">
              <div className="repo-link">
                <Link
                  to={{
                    pathname: `/repo/${repo.full_name}`,
                    state: {
                      content_url: repo.url + "/contents",
                      path: "",
                    },
                  }}
                >
                  {repo.owner.login}/<b>{repo.name}</b>
                </Link>
              </div>
              <div className="repo-about">{repo.description}</div>
              <div className="repo-miscellanous">
                {repo.stargazers_count ? (
                  <div className="misc">
                    <GoStar /> {repo.stargazers_count}
                  </div>
                ) : (
                  ""
                )}
                {repo.language ? (
                  <div className="misc">
                    {" "}
                    <FaCircle /> {repo.language}
                  </div>
                ) : (
                  ""
                )}
                {repo.license ? (
                  <div className="misc"> {repo.license.name} </div>
                ) : (
                  ""
                )}
                <div className="misc">
                  Updated on {dateString(repo.pushed_at)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
