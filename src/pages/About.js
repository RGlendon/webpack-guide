import React from 'react';
import {Link} from "react-router-dom";
import {setHello} from "../store/actions";
import {connect} from "react-redux";

const About = (props) => {
  return (
    <div>
      <h1>About</h1>
      <Link to="/">Home</Link>
      <Link to="/todo">Todos</Link>
      <br/>
      {props.hello}
      <br/>
      <button type="button" onClick={() => props.setHello('HELLO')}>Hello</button>
    </div>
  )
};

const mapStateToProps = (state) => ({
  hello: state.hello
});
const mapDispatchToProps = {
  setHello,
};

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(About),
};

