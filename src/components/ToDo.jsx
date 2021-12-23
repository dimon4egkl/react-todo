import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Divider } from 'react-materialize';
import { ToDoItem } from './ToDoItem';
import { ToDoForm } from './ToDoForm';


const token = '0f0acfe2d331a7855e16bffbdf0860a2486127ae'
const config = {
  headers: {Authorization : `Bearer ${token}`}
}

export const ToDo = () => {
  useEffect(async () => {
    const result = await axios.get(
      'https://api.todoist.com/rest/v1/tasks',
      config
    )
    setTodos(result.data);
  }, [])

  const [todos, setTodos] = useState([
    {id: 1, name: 'some', checked: false},
    {id: 2, name: 'another one', checked: false}
  ]);
  const [idCount, setIdCount] = useState(10);

  const renderTodoItems = (todos) => {
    return (
      <ul className="todo-list">
        { todos.map(todo => <ToDoItem 
            key={todo.id}
            item={todo}
            onRemove={onRemove} 
            onCheck={onCheck}
            onFinishEdit={onFinishEdit}
            todos={todos}
            setTodos={setTodos}
          />) }
      </ul>
    )
  }

  const countDoneItems = () => {
    return todos.reduce((count, item) => {
        if(item.checked){count++;}
        return count;
    }, 0)
  }

  const onRemove = (id) => {
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
      axios.delete(
        `https://api.todoist.com/rest/v1/tasks/${id}`,
        config
      )
      todos.splice(index, 1);
      setTodos([...todos]);
    }
  }

  const removeAllCheckedItems = () => {
    todos.map(item => onRemove(item.id));
  }

  const onCheck = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    axios.post(
      `https://api.todoist.com/rest/v1/tasks/${id}/close`,
      null,
      config
    );
    if (index !== -1) {
      const todo = todos[index];

      todo.checked = !todo.checked;
      todos.splice(index, 1, todo);

      setTodos([...todos]);
    }
  }
  
const onFinishEdit = (id, newname) => {
  axios.post(
    `https://api.todoist.com/rest/v1/tasks/${id}`,
    {content: newname},
    config
  );
}

  const onSubmit = async (title, description) => {
    const todo = {content:title, description};
    console.log(todo)
    const {data} = await axios.post(
      'https://api.todoist.com/rest/v1/tasks',
      todo,
      config
    );
    setTodos([...todos, {...todo, id: data.id}])
  } 

  return (
    
    <Card title={'My todos'} className="todo-card">
      {"Tasks done: " + countDoneItems()}
      <ToDoForm onSubmit={onSubmit} removeAllCheckedItems={removeAllCheckedItems}/>
      <Divider />
      { renderTodoItems(todos) }
    </Card>
  );
}
