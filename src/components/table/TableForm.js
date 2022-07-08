import React, { useState } from 'react';
import { Box, Card, Form, DateInput, Menu, Button, TextInput } from 'grommet';

function TableForm(props) {
  var ID = Math.floor(Math.random() * 10000);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [sta, setSta] = useState("Pending");
  const [pri, setPri] = useState("3-Low");

  const handleChange = e => {
    var s = e.value;
    setInput3(s.substring(0,10));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: ID,
      task: input1,
      desc: input2,
      due: input3,
      status: sta,
      prior: pri,
    });
    
    setInput1('');
    setInput2('');
    setInput3('');
    setSta('Pending');
    setPri('3-Low');
  };

  return (
    <Box alignSelf="center">
      <Form>
        <Card pad="medium" margin="small" border>
          <TextInput
            placeholder='Add a todo'
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
          <TextInput
            placeholder='Add description'
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          <DateInput
            format='yyyy/mm/dd'
            value={input3}
            onChange={handleChange}
            calenderProps={{size: "small"}}
          />
          <Menu
            label="Status"
            items={[
              { label: 'Completed', onClick: () => {setSta("Completed")} },
              { label: 'Pending', onClick: () => {setSta("Pending")} },
            ]}
          />
          <Menu
            label="Priority"
            items={[
              { label: 'High Priority', onClick: () => {setPri('1-High')} },
              { label: 'Moderate Priority', onClick: () => {setPri('2-Medium')} },
              { label: 'Low Priority', onClick: () => {setPri('3-Low')} },
            ]}
          />
          <Button onClick={handleSubmit} className='todo-button' label="Add Todo" />
        </Card>
      </Form>
    </Box>
  )
}

export default TableForm