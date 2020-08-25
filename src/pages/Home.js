import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/about">About</Link>
      <Link to="/todo">Todos</Link>
    </div>
  )
};

export default {
  component: Home,
};
