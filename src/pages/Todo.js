import React from 'react';
import {Link} from "react-router-dom";
import {fetchTodos} from "../store/actions";
import {connect} from "react-redux";

const Todo = ({todos, fetchTodos}) => {
  return (
    <div>
      <h1>Todo</h1>
      <Link to="/">Home</Link>
      <br />
      <button type="button" onClick={() => fetchTodos()}>Get Todos</button>
      <br />
      {
        todos.map((todo) => <p>{todo.id} {todo.title}</p>)
      }
      <br />
    </div>
  )
};

const mapStateToProps = (state) => ({
  todos: state.todos
});
const mapDispatchToProps = {
  fetchTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
