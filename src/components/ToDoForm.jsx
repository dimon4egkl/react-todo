import React from 'react';
import { Form, Input, Button } from 'antd';

export const ToDoForm = (props) => {
  const { onSubmit, removeAllCheckedItems } = props;
  const [form] = Form.useForm();
  const onFinish = (values) => {
    if (onSubmit && validate(values.title, values.description)) {    
      onSubmit(values.title, values.description);
    }
    form.resetFields();
  }

  const validate = (title, description) => {
    let isValidLength = title?.length>3 && description?.length>3;
    if(!isValidLength){
      alert("Field should have move 3 characters");
    }
    let isValidTitle = title[0] === title[0].toUpperCase() && title[0].match(/[a-z]/i);
    if(!isValidTitle){
      alert("Title should start with capital letter");
    }
    return isValidLength && isValidTitle;
  }

  return (
    <Form className="todo-form" form={form} layout={'inline'} onFinish={onFinish}>
      <Form.Item name="title" className="todo-form-input">
        <Input placeholder={'New todo'} />
      </Form.Item>
      <Form.Item name="description" className="todo-form-input">
        <Input placeholder={'Todo description'}/>
      </Form.Item>
      <Form.Item className="todo-form-actions">
        <Button htmlType="submit" type="primary">Add</Button>
      </Form.Item>
      <Form.Item className="todo-form-actions">
        <Button type="primary" danger onClick={removeAllCheckedItems}>Remove all checked</Button>
      </Form.Item>
    </Form>
  )
}
