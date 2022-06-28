import React from "react";

export default function Newsitem(props) {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <div style={{ right: "0", position: "absolute", marginTop: "-4px" }}>
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={!imageUrl ? "no_img.png" : imageUrl}
          className="card-img-top"
          style={{ maxHeight: "250px", minHeight: "200px" }}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "no_img.png";
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
            Read more
          </a>
          <p className="card-text">
            <small className="text-muted">
              Author: {author ? author : "Unknown"}
            </small>
          </p>
          <p className="card-text">
            <small className="text-muted">
              Published on: {new Date(date).toUTCString()}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}
