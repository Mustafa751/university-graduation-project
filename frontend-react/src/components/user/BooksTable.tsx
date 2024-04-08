import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton, Tooltip } from '@chakra-ui/react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Book } from '../interfaces/userInterfaces'; // Adjust the import path as needed
import { Column, useTable } from 'react-table';

interface BooksTableProps {
  books: Book[];
}

const BooksTable: React.FC<BooksTableProps> = ({ books }) => {
    const data = React.useMemo(() => books, [books]);
    const columns: Column<Book>[] = React.useMemo(
      () => [
        {
          Header: "Book Name",
          accessor: "name",
        },
        {
          Header: "Date Taken",
          accessor: "dateTaken",
        },
        {
          Header: "Status",
          accessor: "status",
          Cell: ({ value }) => (value ? "Returned" : "Not Returned"),
        },
        {
          Header: "Actions",
          id: "actions",
          Cell: ({ row }) => (
            <React.Fragment>
              <Tooltip label="Edit" aria-label="Edit tooltip">
                <IconButton
                  icon={<FiEdit />}
                  onClick={() => alert(`Editing ${row.original.name}`)} // Placeholder function
                  mr={2}
                  aria-label={""}
                />
              </Tooltip>
              <Tooltip label="Delete" aria-label="Delete tooltip">
                <IconButton
                  icon={<FiTrash2 />}
                  onClick={() => alert(`Deleting ${row.original.name}`)} // Placeholder function
                  colorScheme="red"
                  aria-label={""}
                />
              </Tooltip>
            </React.Fragment>
          ),
        },
      ],
      []
    );
  
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data });
  
    return (
      <TableContainer>
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()} style={{ textAlign: "left" }}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };
  

export default BooksTable;