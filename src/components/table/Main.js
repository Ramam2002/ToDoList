import React, { useState, useContext } from 'react';
import { Box, Button, Heading } from 'grommet';
import TableDisplay from './TableDisplay';
import TableForm from './TableForm';
// import { Modal } from 'bootstrap';

import { ResponsiveContext } from "grommet/contexts";

function Main() {
  const [todos, setTodos] = useState([ {"id":"0","task":"test-task-1", "desc": "test-1-desc", "status": "Completed", "due": "2022-07-31", "prior": "1-High"}, {"id":"1","task":"test-task-2", "desc": "test-2-desc", "status": "Pending", "due": "2022-08-01", "prior": '3-Low'} ]);
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const size = useContext(ResponsiveContext);

  const addTodo = (todo) => {
    if (!todo.task || /^\s*$/.test(todo.task)) { return; }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    // handleClose();
    console.log(size);
  }

  const updateTodo = (todoId, newValue) => {
    if(newValue.length > 0 && newValue.task.length > 0) setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.status = "Completed";
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <Box>
      <Heading alignSelf='center'> To Do List </Heading>
      <br/>
    {/* <ResponsiveContext> */}
    {(size < 1024) ? (
      <Box pad="small" border justify='evenly'>
      {/* <Button onClick={() => setShow(true)} label="Add New Todo"/>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TableForm onSubmit={addTodo}/>
        </Modal.Body>
      </Modal> */}
      <TableForm onSubmit={addTodo}/>
      <TableDisplay todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
    </Box>
    ) : (
      <Box pad="small" direction='row' justify='evenly'>
      {/* <Button onClick={() => setShow(true)} label="Add New Todo"/>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TableForm onSubmit={addTodo}/>
        </Modal.Body>
      </Modal> */}
      <TableForm onSubmit={addTodo}/>
      <TableDisplay todos={todos} removeTodo={removeTodo} updateTodo={updateTodo}/>
    </Box>
    )}
    {/* </ResponsiveContext> */}
    </Box>
  )
}

export default Main