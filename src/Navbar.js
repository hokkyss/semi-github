import "./Navbar.css";
import "./index.css";
import { FaGithub, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [text, setText] = useState("");

  const searchButton = {
    display: "flex",
    "flex-direction": "row",
    "background-color": "inherit",
    color: "inherit",
    "padding-bottom": "0.5%",
    width: "100%",
    height: "7%",
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-content">
          <Link to="/">
            <FaGithub className="github-icon" color="white" />
          </Link>
        </div>
        <div className="navbar-content">
          <a href="https://github.com/team" className="text-link">
            Team
          </a>
        </div>

        <div className="navbar-content">
          <a href="https://github.com/enterprise" className="text-link">
            Enterprise
          </a>
        </div>

        <div className="navbar-content">
          <a href="https://github.com/marketplace" className="text-link">
            Marketplace
          </a>
        </div>

        <div className="navbar-content">
          <a href="https://github.com/explore" className="text-link">
            Explore
          </a>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-content">
          <input
            placeholder="Search"
            className="search-box"
            value={text}
            onChange={(event) => setText(event.target.value)}
          ></input>
        </div>
        <div className="navbar-content">
          <Link to={`/search/${text}`} style={searchButton}>
            <FaSearch className="submit-search" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
