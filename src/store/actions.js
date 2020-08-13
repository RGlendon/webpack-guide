import {FETCH_TODOS, SET_HELLO} from "./types";
import axios from "axios";

export const setHello = (payload) => ({
  type: SET_HELLO,
  payload
});

export const fetchTodos = () => async dispatch => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  dispatch({
    type: FETCH_TODOS,
    payload: response.data,
  });
};