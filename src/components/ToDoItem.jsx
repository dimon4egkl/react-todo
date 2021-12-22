import React  from 'react';
import { Button, Checkbox, Input } from 'antd';
import ReactDOM from 'react-dom';

export const ToDoItem = (props) => {
  const { item, onCheck, onRemove, onFinishEdit } = props;
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
    <div style={{fontWeight: "bold", fontSize: "150%" }}><Input id={"input-"+item.id} type="text"></Input></div><div>{item.description}</div></div>
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
      <li className="todo-item" id={item.id}>
      <Checkbox id={`checkbox-${item.id}`}
         style={{color: isChecked ? "red" : "black"}}
        onChange={onChange}
      >{getContent()}</Checkbox>
      <Button onClick={onEditItem}> 
      <img src="https://img.icons8.com/material-outlined/20/000000/edit--v1.png"/>
      </Button>
      <Button danger onClick={onRemoveItem} type={"primary"} >
        <img src="https://img.icons8.com/ios/20/000000/trash--v1.png"/>
        </Button>
    </li>  
    );
  }

  const renderItemAfterEdit = () => {
    const todoItem = document.getElementById(item.id);
    console.log(todoItem);
    ReactDOM.render(getItemAfterEdit(), todoItem) ;
  }



  const renderEditFields = () => {
    return (
      <li className="todo-item" id={item.id}>
      <Checkbox id={`checkbox-${item.id}`}
         style={{color: isChecked ? "red" : "black"}}
        onChange={onChange}
      >{getEditContent()}</Checkbox>
      <Button onClick={onFinishEditItem}>
      <img src="https://img.icons8.com/material-outlined/20/000000/checkmark--v1.png"/>
      </Button>
      <Button danger onClick={onRemoveItem} type={"primary"} >
        <img src="https://img.icons8.com/ios/20/000000/trash--v1.png"/>
        </Button>
    </li>
    )
  }

  const getNewName = () => {
    const todoItem = document.getElementById(item.id);
    console.log(todoItem);
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
      >{getContent()}</Checkbox>
      <Button onClick={onEditItem}> 
      <img src="https://img.icons8.com/material-outlined/20/000000/edit--v1.png"/>
      </Button>
      <Button danger onClick={onRemoveItem} type={"primary"} >
        <img src="https://img.icons8.com/ios/20/000000/trash--v1.png"/>
        </Button>
    </li>
  )
}