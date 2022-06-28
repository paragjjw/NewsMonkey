import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import PropTypes from "prop-types";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function App() {
  const [progress, setProgress] = useState(0);
  // const setProgress = (progress) => {
  //   newProgress(progress);
  // };
  const apiKey = process.env.REACT_APP_NEWS_API;
  return (
    <Router>
      <div>
        <LoadingBar color="#f11946" progress={progress} />
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="1"
                pageSize={5}
                country="in"
                category="general"
              />
            }
          ></Route>
          <Route
            path="/general"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="2"
                pageSize={5}
                country="in"
                category="general"
              />
            }
          ></Route>
          <Route
            path="/business"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="3"
                pageSize={5}
                country="in"
                category="business"
              />
            }
          ></Route>
          <Route
            path="/entertainment"
            element={
              <News
                key="4"
                pageSize={5}
                country="in"
                category="entertainment"
              />
            }
          ></Route>
          <Route
            path="/health"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="5"
                pageSize={5}
                country="in"
                category="health"
              />
            }
          ></Route>
          <Route
            path="/science"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="6"
                pageSize={5}
                country="in"
                category="science"
              />
            }
          ></Route>
          <Route
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="7"
                pageSize={5}
                country="in"
                category="sports"
              />
            }
          ></Route>
          <Route
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="8"
                pageSize={5}
                country="in"
                category="technology"
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

App.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
App.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
