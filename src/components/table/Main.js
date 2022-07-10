import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Heading } from 'grommet';
import TableDisplay from './TableDisplay';
import TableForm from './TableForm';
// import { Modal } from 'bootstrap';

import { ResponsiveContext } from "grommet/contexts";

function Main() {
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todosdata') || "[]"));
  useEffect(() => {
    localStorage.setItem('todosdata', JSON.stringify(todos))
  }, [todos]);

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
    if(newValue.status === "cancel") return;
    newValue.id = todoId;
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    // const temp = JSON.parse(localStorage.getItem('todosdata'));
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
      <TableDisplay todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} completeTodo={completeTodo}/>
    </Box>
    )}
    {/* </ResponsiveContext> */}
    </Box>
  )
}

export default Main