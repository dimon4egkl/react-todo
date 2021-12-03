import React from 'react';
import { Button, Checkbox } from 'antd';

export const ToDoItem = (props) => {
  const { item, onCheck, onRemove } = props;
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

  const getContent = () => {
    return <div style={{display: "block", flexDirection: "row", justifyContent: "space-between", width: "300px"}}>
          <div style={{fontWeight: "bold", fontSize: "150%" }}>{item.content}</div><div>{item.description}</div></div>
  }

  return (
    <li className="todo-item" key={item.id}>
      <Checkbox 
         style={{color: isChecked ? "red" : "black"}}
        onChange={onChange}
      >{getContent()}</Checkbox>
      <Button danger onClick={onRemoveItem} type={"primary"} >
        <img src="https://img.icons8.com/ios/20/000000/trash--v1.png"/>
        </Button>
    </li>
  )
}