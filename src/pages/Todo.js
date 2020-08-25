import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {fetchTodos} from "../store/actions";
import {connect} from "react-redux";

const Todo = ({todos, fetchTodos}) => {
  useEffect(() => {
    fetchTodos();
  });

  return (
    <div>
      <h1>Todo</h1>
      <Link to="/">Home</Link>
      <br/>
      {/*<br />*/}
      {/*<button type="button" onClick={() => fetchTodos()}>Get Todos</button>*/}
      <br/>
      {
        todos.map((todo) => <p key={todo.id}>{todo.id} {todo.title}</p>)
      }
      <br/>
    </div>
  )
};

// теперь на сервере мы можем обращаться к fetchTodos
const loadData = (store, param) => {
  return store.dispatch(fetchTodos(param))
};

const mapStateToProps = (state) => ({
  todos: state.todos
});
const mapDispatchToProps = {
  fetchTodos,
};

// export default connect(mapStateToProps, mapDispatchToProps)(Todo);
// при SSR необходимо, чтобы при вызове сработал action fetchTodos, пришли данные, заполнился store и отренедрилась
// страница отренедрилась на сервера заполненными данными и отдать ее пользователю.
// Как через роуты дернуть action?
// Преобразуем component, а в роутах проводим реструктуризацию.
// Теперь можно добавить action, для этого создадим еще одну функцию loadData
export default {
  component: connect(mapStateToProps, mapDispatchToProps)(Todo),
  loadData
};
