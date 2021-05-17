import "./RepositoryDetail.css";
import "./index.css";
import { React, useState, useEffect, useCallback } from "react";
import { GoRepo, GoGitBranch, GoTag } from "react-icons/go";
import { VscFile } from "react-icons/all";
import { FaFolder } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

function RepositoryDetail({ match }) {
  const [content, setContent] = useState([]);
  const [readme, setReadme] = useState("");
  const [contributors, setContributors] = useState([]);
  const [description, setDescription] = useState("");
  const [branch, setBranch] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchReadme = useCallback(async (name, repository, default_branch) => {
    const config = {
      method: "GET",
    };
    const readme_url = `https://raw.githubusercontent.com/${name}/${repository}/${default_branch}/README.md`;
    const result = await (await fetch(readme_url, config)).text();
    setReadme(result);
  }, []);

  const fetchContents = useCallback(async (name, repository) => {
    const config = {
      method: "GET",
      headers: { authorization: "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" },
    };
    const contents_url = `https://api.github.com/repos/${name}/${repository}/contents/`;
    const result = await (await fetch(contents_url, config)).json();
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

  const fetchAll = useCallback(
    async (name, repo) => {
      const config = {
        method: "GET",
        headers: { authorization: "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" },
      };
      const repo_url = `https://api.github.com/repos/${name}/${repo}`;
      const result = await (await fetch(repo_url, config)).json();
      setDescription(result.description);
      fetchReadme(name, repo, result.default_branch);
      fetchContents(name, repo);
      fetchContributors(name, repo);
      fetchBranch(name, repo);
      fetchTags(name, repo);
    },
    [fetchReadme, fetchContents, fetchContributors, fetchBranch, fetchTags]
  );

  useEffect(() => {
    fetchAll(match.params.name, match.params.repository);
  }, [fetchAll, match.params.name, match.params.repository]);

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
          </div>
          <div className="repo-branches">
            <a
              href={`https://github.com/${match.params.name}/${match.params.repository}/branches`}
            >
              <GoGitBranch className="branch-logo" />
              <b>{branch.length}</b> branches.
            </a>
          </div>

          <div className="repo-tags">
            <a
              href={`https://github.com/${match.params.name}/${match.params.repository}/tags`}
            >
              <GoTag className="tag-logo" />
              <b>{tags.length}</b> tags.
            </a>
          </div>
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
