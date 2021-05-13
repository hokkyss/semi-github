import "./RepositoryDetail.css";
import "./index.css";
import { React, useState, useEffect } from "react";
import { GoRepo, GoGitBranch, GoTag } from "react-icons/go";
import { VscFile } from "react-icons/all";
import { FaFolder } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

function RepositoryDetail({ match }) {
  const [repo, setRepo] = useState({});
  const [content, setContent] = useState([]);
  const [readme, setReadme] = useState("");
  const [contributors, setContributors] = useState([]);
  const [description, setDescription] = useState("");
  const [branch, setBranch] = useState([]);
  const [tags, setTags] = useState([]);

  const config = { method: "GET" };

  useEffect(() => {
    fetchAll();
  });

  const repo_url = `https://api.github.com/repos/${match.params.name}/${match.params.repository}`;
  /*
  const fetchEverything = () => {
    fetch(repo_url, config)
      .then((response) => response.json())
      .then((result) => {
        setRepo(result);
        setDescription(result.description);
        fetchReadme(
          match.params.name,
          match.params.repository,
          result.default_branch
        );
        fetchContents(match.params.name, match.params.repository);
        fetchContributors(match.params.name, match.params.repository);
        fetchBranch(match.params.name, match.params.repository);
        fetchTags(match.params.name, match.params.repository);
      })
      .catch((error) => console.log(error));
  };
*/

  const fetchAll = async () => {
    const result = await (await fetch(repo_url, config)).json();
    setRepo(result);
    setDescription(result.description);
    fetchReadme(
      match.params.name,
      match.params.repository,
      result.default_branch
    );
    fetchContents(match.params.name, match.params.repository);
    fetchContributors(match.params.name, match.params.repository);
    fetchBranch(match.params.name, match.params.repository);
    fetchTags(match.params.name, match.params.repository);
  };

  const fetchReadme = async (name, repository, default_branch) => {
    const readme_url = `https://raw.githubusercontent.com/${name}/${repository}/${default_branch}/README.md`;
    const result = await (await fetch(readme_url, config)).text();
    setReadme(result);
  };

  const fetchContents = async (name, repository) => {
    const contents_url = `https://api.github.com/repos/${name}/${repository}/contents/`;
    const result = await (await fetch(contents_url, config)).json();
    setContent(result);
  };

  const fetchContributors = async (name, repository) => {
    const contributors_url = `https://api.github.com/repos/${name}/${repository}/contributors`;
    const result = await (await fetch(contributors_url, config)).json();
    setContributors(result);
  };

  const fetchBranch = async (name, repository) => {
    const branch_url = `https://api.github.com/repos/${name}/${repository}/branches`;
    const result = await (await fetch(branch_url, config)).json();
    setBranch(result);
  };

  const fetchTags = async (name, repository) => {
    const tags_url = `https://api.github.com/repos/${name}/${repository}/tags`;
    const result = await (await fetch(tags_url, config)).json();
    setTags(result);
  };

  console.log(repo);

  return (
    <div className="container">
      <div className="detail-container">
        <div className="repo-info">
          <div className="repo-name">
            <a
              href={`https://github.com/${match.params.name}/${match.params.repository}`}
            >
              <GoRepo className="repo-logo" />
              {match.params.name}/<b>{match.params.repository}</b>
            </a>
            {match.params.path === undefined ? "" : `/${match.params.path}`}
          </div>
          {match.params.path === undefined ? (
            <div className="repo-branches">
              <a
                href={`https://github.com/${match.params.name}/${match.params.repository}/branches`}
              >
                <GoGitBranch className="branch-logo" />
                <b>{branch.length}</b> branches.
              </a>
            </div>
          ) : (
            ""
          )}
          {match.params.path === undefined ? (
            <div className="repo-tags">
              <a
                href={`https://github.com/${match.params.name}/${match.params.repository}/tags`}
              >
                <GoTag className="tag-logo" />
                <b>{tags.length}</b> tags.
              </a>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="repo-files">
          {content.map((fileFolder) => (
            <a
              key={fileFolder.sha}
              href={fileFolder.html_url}
              class="repo-filenames"
            >
              {fileFolder.type === "file" ? (
                <VscFile className="fileFolder-logo" />
              ) : (
                <FaFolder className="fileFolder-logo" />
              )}
              {fileFolder.name}
            </a>
          ))}
        </div>
        <div className="repo-readme">
          <div className="readme-md-title">README.md</div>
          <ReactMarkdown
            children={readme}
            skipHtml={false}
            className="readme-md-content"
          />
        </div>
      </div>
      <div className="repo-desc">
        <div className="desc">
          <div>
            <b>About</b>
          </div>
          <div>{description}</div>
        </div>
        <div className="desc">
          <div>
            <b>Contributors</b>
          </div>
          {contributors.map((users) => (
            <a key={users.id} href={users.html_url}>
              <img src={users.avatar_url} className="user-image" alt="" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RepositoryDetail;
