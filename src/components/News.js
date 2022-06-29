import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${props.apiKey}`,
      "X-RapidAPI-Host": "newscatcher.p.rapidapi.com",
    },
  };
  // document.title = `${
  //   props.category[0].toUpperCase() + props.category.slice(1)
  // } - NewMonkey`;
  const updateNews = async (pageNo) => {
    props.setProgress(10);
    let url = `https://newscatcher.p.rapidapi.com/v1/search?q=*&lang=en&country=${props.country}&topic=${props.category}&page=${pageNo}&page_size=${props.pageSize}&media=True`;
    setLoading(true);
    let data = await fetch(url, options);
    props.setProgress(50);
    let parsed_data = await data.json();
    // console.log(parsed_data);
    setArticles(parsed_data.articles);
    setTotalResults(parsed_data.total_pages);
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
    let url = `https://newscatcher.p.rapidapi.com/v1/search?q=*&lang=en&country=${
      props.country
    }&topic=${props.category}&page=${page + 1}&page_size=${
      props.pageSize
    }&media=True`;
    // this.setState({ loading: true });
    let data = await fetch(url, options);
    let parsed_data = await data.json();
    console.log(parsed_data);
    setArticles(articles.concat(parsed_data.articles));
    setTotalResults(parsed_data.total_pages);
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
        hasMore={page !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.link}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.summary ? element.summary.slice(0, 88) : ""
                    }
                    imageUrl={element.media}
                    newsUrl={element.link}
                    author={element.author}
                    date={element.published_date}
                    source={element.rights.slice(0, -4)}
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
