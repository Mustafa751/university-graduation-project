import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Roles, UserToBeCreated } from "../interfaces/userInterfaces"; // Adjust the import path as needed
import { Column, useTable } from "react-table";
import { SendRequestOptions, sendRequest } from "../hooks/http";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface UserToBeCreatedTableProps {
  users: UserToBeCreated[];
}

const UserToBeCreatedTable: React.FC<UserToBeCreatedTableProps> = ({
  users,
}) => {
  const data = React.useMemo(() => users, [users]);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const columns: Column<UserToBeCreated>[] = React.useMemo(
    () => [
      {
        Header: "FAK Number",
        accessor: "fakNumber",
      },
      {
        Header: "EGN",
        accessor: "egn",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row }) => (
          <React.Fragment>
            <Tooltip
              label="Create as Student"
              aria-label="Create as Student tooltip"
            >
              <IconButton
                icon={<FiEdit />}
                onClick={() => createUserWithRole(row.original, Roles.STUDENT)}
                mr={2}
                aria-label="Create as Student"
              />
            </Tooltip>
            <Tooltip
              label="Create as Teacher"
              aria-label="Create as Teacher tooltip"
            >
              <IconButton
                icon={<FiEdit />}
                onClick={() => createUserWithRole(row.original, Roles.TEACHER)}
                mr={2}
                aria-label="Create as Teacher"
              />
            </Tooltip>
            <Tooltip
              label="Create as Admin"
              aria-label="Create as Admin tooltip"
            >
              <IconButton
                icon={<FiEdit />}
                onClick={() => createUserWithRole(row.original, Roles.ADMIN)}
                mr={2}
                aria-label="Create as Admin"
              />
            </Tooltip>
            <Tooltip label="Delete" aria-label="Delete tooltip">
              <IconButton
                icon={<FiTrash2 />}
                onClick={() => alert(`Deleting ${row.original.email}`)} // Placeholder function
                colorScheme="red"
                aria-label="Delete User"
              />
            </Tooltip>
          </React.Fragment>
        ),
      },
    ],
    []
  );
  const createUserWithRole = async (user: UserToBeCreated, role: Roles) => {
    try {
      const requestOptions: SendRequestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      sendRequest<Response>(
        `http://localhost:8089/api/usersCreate/${role}`,
        requestOptions,
        navigate,
        logout
      ).then((response: Response) => {
        if (response) {
          alert(`User created as ${role}`);
        } else {
          throw new Error("Failed to create user");
        }
      });
    } catch (error) {
      alert(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };
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

export default UserToBeCreatedTable;
