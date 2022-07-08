import React from 'react';
import { Box } from 'grommet';

const GlobalFilter = ({filter, setFilter}) => {
  return (
    <Box direction='row'>
      Search: { ' ' }
      <input value={filter || ''} onChange={(e) => setFilter(e.target.value)}></input>
    </Box>
  )
}

export default GlobalFilter;