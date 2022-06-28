import React from "react";
import loading from "./loading.gif";
export default function Spinner() {
  return (
    <div className="my-3" style={{ textAlign: "center" }}>
      <img src={loading} alt="loading" />
    </div>
  );
}
