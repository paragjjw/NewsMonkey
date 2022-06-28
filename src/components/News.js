import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `${
  //   props.category[0].toUpperCase() + props.category.slice(1)
  // } - NewMonkey`;
  const updateNews = async (pageNo) => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50);
    let parsed_data = await data.json();
    // console.log(parsed_data);
    setArticles(parsed_data.articles);
    setTotalResults(parsed_data.totalResults);
    setLoading(false);
    setPage(pageNo);
    props.setProgress(100);
  };
  useEffect(() => {
    updateNews(1);
  }, []);
  // const handlePrevClick = async () => {
  //   if (page > 1) updateNews(page - 1);
  // };
  // const handleNextClick = async () => {
  //   if (page + 1 <= Math.ceil(totalResults / props.pageSize))
  //     updateNews(page + 1);
  // };
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsed_data = await data.json();
    console.log(parsed_data);
    setArticles(articles.concat(parsed_data.articles));
    setTotalResults(parsed_data.totalResults);
    setLoading(false);
    setPage(page + 1);
  };
  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "90px" }}>
        NewsMonkey - Top{" "}
        {props.category[0].toUpperCase() + props.category.slice(1)} headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
            disabled={this.state.page <= 1}
          >
            &laquo; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next &raquo;
          </button>
        </div> */}
    </>
  );
}
