import "./RepositoryDetail.css";
import "./index.css";
import { React, useState, useEffect, useCallback } from "react";
import { useLocation, useRouteMatch, Link } from "react-router-dom";
import { GoRepo, GoGitBranch, GoTag } from "react-icons/go";
import { VscFile } from "react-icons/all";
import { FaFolder } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

function RepositoryDetail() {
  const [content, setContent] = useState([]);
  const [readme, setReadme] = useState("");
  const [contributors, setContributors] = useState([]);
  const [description, setDescription] = useState("");
  const [branch, setBranch] = useState([]);
  const [tags, setTags] = useState([]);

  const location = useLocation();
  console.log(location);
  const { content_url, path } = location.state;
  console.log(content_url);
  console.log(path);
  const match = useRouteMatch("/repo/:name/:repository");

  const fetchReadme = useCallback(
    async (name, repository, default_branch) => {
      const config = {
        method: "GET",
      };
      const readme_url = `https://raw.githubusercontent.com/${name}/${repository}/${default_branch}/${path}README.md`;
      //  https://raw.githubusercontent.com/EntelectChallenge/2019-Worms/develop/starter-bots/README.md
      const result = await (await fetch(readme_url, config)).text();
      setReadme(result);
    },
    [path]
  );

  const fetchContents = useCallback(async (url) => {
    const config = {
      method: "GET",
      headers: { authorization: "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" },
    };
    const result = await (await fetch(url, config)).json();
    setContent(result);
  }, []);

  const fetchContributors = useCallback(async (name, repository) => {
    const config = {
      method: "GET",
      headers: { authorization: "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" },
    };
    const contributors_url = `https://api.github.com/repos/${name}/${repository}/contributors`;
    const result = await (await fetch(contributors_url, config)).json();
    setContributors(result);
  }, []);

  const fetchBranch = useCallback(async (name, repository) => {
    const config = {
      method: "GET",
      headers: { authorization: "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" },
    };
    const branch_url = `https://api.github.com/repos/${name}/${repository}/branches`;
    const result = await (await fetch(branch_url, config)).json();
    setBranch(result);
  }, []);

  const fetchTags = useCallback(async (name, repository) => {
    const config = {
      method: "GET",
      headers: { authorization: "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" },
    };
    const tags_url = `https://api.github.com/repos/${name}/${repository}/tags`;
    const result = await (await fetch(tags_url, config)).json();
    setTags(result);
  }, []);

  const fetchDescReadme = useCallback(
    async (name, repository) => {
      const config = {
        method: "GET",
        headers: { authorization: "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" },
      };
      const repo_url = `https://api.github.com/repos/${name}/${repository}`;
      const result = await (await fetch(repo_url, config)).json();
      setDescription(result.description);
      fetchReadme(name, repository, result.default_branch);
    },
    [fetchReadme]
  );

  const fetchAll = useCallback(
    async (name, repository, contents_url) => {
      fetchContents(contents_url);
      fetchBranch(name, repository);
      fetchTags(name, repository);
      fetchContributors(name, repository);
      fetchDescReadme(name, repository);
    },
    [fetchContents, fetchBranch, fetchTags, fetchContributors, fetchDescReadme]
  );

  useEffect(() => {
    fetchAll(match.params.name, match.params.repository, content_url);
    console.log(location);
  }, [
    fetchAll,
    match.params.name,
    match.params.repository,
    content_url,
    location,
  ]);

  console.log(content);

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
            /{path}
          </div>
          {path === "" ? (
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

          {path === "" ? (
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
          {content.map((fileFolder) =>
            fileFolder.type === "file" ? (
              <a
                key={fileFolder.sha}
                href={fileFolder.html_url}
                class="repo-filenames"
              >
                <VscFile className="fileFolder-logo" />
                {fileFolder.name}
              </a>
            ) : (
              <Link
                to={{
                  pathname: `${location.pathname}/${fileFolder.name}`,
                  state: {
                    content_url: `${content_url}/${fileFolder.name}`,
                    path: `${path}${fileFolder.name}/`,
                  },
                }}
                class="repo-filenames"
              >
                <FaFolder className="fileFolder-logo" />
                {fileFolder.name}
              </Link>
            )
          )}
        </div>
        {readme === "404: Not Found" ? (
          ""
        ) : (
          <div className="repo-readme">
            <div className="readme-md-title">README.md</div>
            <ReactMarkdown skipHtml={true} className="readme-md-content">
              {readme}
            </ReactMarkdown>
          </div>
        )}
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
            <a key={users.id} href={users.html_url} title={users.login}>
              <img src={users.avatar_url} className="user-image" alt="" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RepositoryDetail;
