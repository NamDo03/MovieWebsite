import React from "react";
import Main from "../components/Main";
import List from "../components/List";

const Home = () => {
  return (
    <div>
      <Main />
      <List listId={1} title="Netflix Originals"/>
      <List listId={2} title="UpComing" />
      <List listId={3} title="Trending" />
      <List listId={4} title="Top Rated" />
    </div>
  );
};

export default Home;
