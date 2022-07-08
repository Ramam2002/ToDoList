import React, { useState } from 'react';
import { Box, Card, Form, DateInput, Menu, Button, TextInput } from 'grommet';

function EditForm(props) {
  const id = props.id;
  const [input1, setInput1] = useState(props.task);
  const [input2, setInput2] = useState(props.desc);
  const [input3, setInput3] = useState(props.due);
  const [sta, setSta] = useState("Pending");
  const [pri, setPri] = useState(props.prior);

  const handleChange = e => {
    var s = e.value;
    setInput3(s.substring(0,10));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: id,
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

  const handleCancel = () => {
    props.onSubmit({});
  }

  return (
    <Box alignSelf="center">
      <Form>
        <Card pad="medium" margin="small" border>
          <TextInput
            size="small"
            placeholder='Add a todo'
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
          <TextInput
            size="small"
            placeholder='Add description'
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          <DateInput
            size="small"
            format='yyyy/mm/dd'
            value={input3}
            onChange={handleChange}
            calenderProps={{size: "small"}}
          />
          <Menu
            label="Status"
            size="small"
            items={[
              { label: 'Completed', onClick: () => {setSta("Completed")} },
              { label: 'Pending', onClick: () => {setSta("Pending")} },
            ]}
          />
          <Menu
            label="Priority"
            size="small"
            items={[
              { label: 'High Priority', onClick: () => {setPri('1-High')} },
              { label: 'Moderate Priority', onClick: () => {setPri('2-Medium')} },
              { label: 'Low Priority', onClick: () => {setPri('3-Low')} },
            ]}
          />
          <Box direction='row' justify='evenly'>
            <Button onClick={handleSubmit} size="xsmall" className='todo-button' label="Update" />
            <Button onClick={handleCancel} size="xsmall" className='todo-button' label="Cancel" />
          </Box>
        </Card>
      </Form>
    </Box>
  )
}

export default EditForm;