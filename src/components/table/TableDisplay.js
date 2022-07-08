import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import Cols from './Columns';
import BTable from 'react-bootstrap/Table'
import EditForm from './EditForm';
import {Box, Button, Card} from 'grommet';
import { GrCaretUp, GrCaretDown } from "react-icons/gr";
import { TiEdit, TiTick, TiTrash, TiTimesOutline } from 'react-icons/ti';
// import GlobalFilter from './GlobalFilter';

const TableDisplay = ({ todos, completeTodo, removeTodo, updateTodo }) => {

  // table
  const [data, setData] = useState(useMemo(() => todos,[]));
  const columns = useMemo(() => Cols,[]);
  const [edit, setEdit] = useState({
    id: null,
    task: "",
    desc: "",
    due: "",
    status: "Pending",
    prior: "3-Low"
  });

  // rendering for every change
  useEffect(() => {
    setData(todos)
  }, [todos])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    pageCount,
    prepareRow,
  } = useTable({ columns, data, initialState: {pageSize: 5} }, useSortBy, usePagination, )

  const { pageIndex, pageSize } = state

  // update task
  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      task: "",
      desc: "",
      due: "",
      status: "Pending",
      prior: "3-Low"
    });
  };

  if (edit.id) {
    return <EditForm onSubmit={submitUpdate} />;
  }


  return (
    <Box>
    <Card style={{minHeight: "30vh"}} background="aliceblue" margin="small" border overflow="scroll">
      <BTable {...getTableProps()} class="table table-bordered table-hover table-light">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <td {...column.getHeaderProps(column.getSortByToggleProps())}>
                <strong>{column.render('Header')}</strong>
                <span style={{padding: "3px"}}>
                  {column.isSorted ? (column.isSortedDesc ? <GrCaretDown/> : <GrCaretUp/>) : ""}
                </span>
              </td>
            ))}
            <td> <strong>Actions</strong> </td>
          </tr>
        ))}
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {page.map(row => {prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
              <td> 
                <Box direction='row' >
                  <TiTrash
                    size={28}
                    onClick={() => removeTodo(row.cells[0].value)}
                    className='delete-icon'
                  />
                  {(row.cells[4].value === "Completed") ? (
                    <TiTick size={30}/>
                  ) : (
                    <>
                      <TiEdit size={28} onClick={() => setEdit({ id: row.cells[0].value, task: row.cells[1].value, desc: row.cells[2].value, due: row.cells[3].value, status: row.cells[4].value, prior: row.cells[5].value })}/>
                      {/* <TiTimesOutline onClick={() => completeTodo(row.cells[0].value)} size={30}/> */}
                    </>
                  )}
                </Box>
              </td>
            </tr>
          )
        })}
      </tbody>
    </BTable>
   </Card>
    <Box direction='row' margin="small" justify='evenly'>
        <Button onClick={() => previousPage()} disabled={!canPreviousPage} label="Prev" />
        <strong> {pageIndex + 1} of {pageOptions.length} </strong>
        <Button onClick={() => nextPage()} disabled={!canNextPage} label="Next" />
    </Box>
   </Box>
  )
}

export default TableDisplay;