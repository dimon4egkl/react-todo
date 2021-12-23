import React  from 'react';
import M from 'materialize-css'
import { Button, Checkbox, TextInput } from 'react-materialize';
import ReactDOM from 'react-dom';

export const ToDoItem = (props) => {
  const { item, onCheck, onRemove, onFinishEdit, todos, setTodos } = props;
  const isChecked = item.checked;
  const onRemoveItem = (e) => {
    e.preventDefault();

    if (onRemove) {
      onRemove(item.id);
    }
  }

  const onChange = (e) => {
    if (onCheck) {
      onCheck(item.id);
    }
  }

  const onEditItem = (e) => {
      getNewName();
  } 

  const getEditContent = () => {
    return <div style={{display: "block", flexDirection: "row", justifyContent: "space-between", width: "300px"}}>
    <div style={{fontWeight: "bold", fontSize: "150%" }}><TextInput id={"input-"+item.id}></TextInput></div><div>{item.description}</div></div>
  }

  const onFinishEditItem = (e) => {
    if(onFinishEdit){
      const input = document.getElementById("input-"+item.id).value;
      item.content = input;
      onFinishEdit(item.id,input);
      renderItemAfterEdit();
    }
  }

  const getItemAfterEdit = () => {
    return (
      <React.Fragment>
        <Checkbox id={`checkbox-${item.id}`}
      style={{color: isChecked ? "red" : "black"}}
     onChange={onChange}
   ></Checkbox>
   {getContent()}
   <Button onClick={onEditItem}> 
   <img src="https://img.icons8.com/material-outlined/20/000000/edit--v1.png"/>
   </Button>
   <Button onClick={onRemoveItem} >
     <img src="https://img.icons8.com/ios/20/000000/trash--v1.png"/>
     </Button></React.Fragment>
    );
  }

  const renderItemAfterEdit = () => {
    const todoItem = document.getElementById(item.id);
    console.log(todoItem);
    ReactDOM.render(getItemAfterEdit(), todoItem) ;
  }



  const renderEditFields = () => {
    return (
      <React.Fragment>
      <Checkbox id={`checkbox-${item.id}`}
         style={{color: isChecked ? "red" : "black"}}
        onChange={onChange}
      ></Checkbox>
      {getEditContent()}
      <Button onClick={onFinishEditItem}>
      <img src="https://img.icons8.com/material-outlined/20/000000/checkmark--v1.png"/>
      </Button>
      <Button onClick={onRemoveItem} >
        <img src="https://img.icons8.com/ios/20/000000/trash--v1.png"/>
        </Button>
      </React.Fragment>
    )
  }

  const getNewName = () => {
    const todoItem = document.getElementById(item.id);
    ReactDOM.render(renderEditFields(), todoItem) ;
  }


  const getContent = () => {
    return <div style={{display: "block", flexDirection: "row", justifyContent: "space-between", width: "300px"}}>
          <div style={{fontWeight: "bold", fontSize: "150%" }}>{item.content}</div><div>{item.description}</div></div>
  }

  return (
    <li className="todo-item" id={item.id}>
      <Checkbox id={`checkbox-${item.id}`}
         style={{color: isChecked ? "red" : "black"}}
        onChange={onChange}
      ></Checkbox>
      {getContent()}
      <Button onClick={onEditItem}> 
      <img src="https://img.icons8.com/material-outlined/20/000000/edit--v1.png"/>
      </Button>
      <Button onClick={onRemoveItem}>
        <img src="https://img.icons8.com/ios/20/000000/trash--v1.png"/>
        </Button>
    </li>
  )
}