import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Book } from "../interfaces/userInterfaces"; // Adjust the import path as needed
import { Column, useTable } from "react-table";
import { useTranslation } from "react-i18next";

interface BooksTableProps {
  books: Book[];
}

const BooksTable: React.FC<BooksTableProps> = ({ books }) => {
  const { t } = useTranslation();

  const data = React.useMemo(() => books, [books]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const columns: Column<Book>[] = React.useMemo(
    () => [
      {
        Header: t("booksTable.bookName"),
        accessor: "name",
      },
      {
        Header: t("booksTable.dateTaken"),
        accessor: "date",
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: t("booksTable.status"),
        accessor: "status",
        Cell: ({ value }) =>
          value ? t("booksTable.returned") : t("booksTable.notReturned"),
      },
    ],
    [t]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const tableWidth = useBreakpointValue({ base: "100%", md: "auto" });

  return (
    <Box overflowX="auto">
      <TableContainer w={tableWidth}>
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps()}
                    style={{ textAlign: "left" }}
                  >
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
    </Box>
  );
};

export default BooksTable;
