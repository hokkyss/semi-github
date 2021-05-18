import "./RepositoryDetail.css";
import "./index.css";
import { React } from "react";
import { Link } from "react-router-dom";
import { FaFolder } from "react-icons/fa";

function RepositoryNewPage(props) {
  return (
    <Link
      to={`${current_url}/${fileFolder.name}`}
      path={`${path}${fileFolder.name}/`}
      content_url={`${content_url}/${fileFolder.name}`}
      class="repo-filenames"
    >
      <FaFolder className="fileFolder-logo" />
      {fileFolder.name}
    </Link>
  );
}

export default RepositoryDetail;
