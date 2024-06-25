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
import { useTranslation } from "react-i18next";

interface UserToBeCreatedTableProps {
  users: UserToBeCreated[];
}

const UserToBeCreatedTable: React.FC<UserToBeCreatedTableProps> = ({
  users,
}) => {
  const data = React.useMemo(() => users, [users]);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t } = useTranslation();

  const columns: Column<UserToBeCreated>[] = React.useMemo(
    () => [
      {
        Header: t("userTable.fakNumber"),
        accessor: "fakNumber",
      },
      {
        Header: t("userTable.email"),
        accessor: "email",
      },
      {
        Header: t("userTable.phoneNumber"),
        accessor: "phoneNumber",
      },
      {
        Header: t("userTable.actions"),
        id: "actions",
        Cell: ({ row }) => (
          <React.Fragment>
            <Tooltip
              label={t("userTable.createAsStudent")}
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
              label={t("userTable.createAsTeacher")}
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
              label={t("userTable.createAsOperator")}
              aria-label="Create as Operator tooltip"
            >
              <IconButton
                icon={<FiEdit />}
                onClick={() => createUserWithRole(row.original, Roles.OPERATOR)}
                mr={2}
                aria-label="Create as Operator"
              />
            </Tooltip>
            <Tooltip
              label={t("userTable.createAsAdmin")}
              aria-label="Create as Admin tooltip"
            >
              <IconButton
                icon={<FiEdit />}
                onClick={() => createUserWithRole(row.original, Roles.ADMIN)}
                mr={2}
                aria-label="Create as Admin"
              />
            </Tooltip>
            <Tooltip label={t("userTable.delete")} aria-label="Delete tooltip">
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
    [t]
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
          alert(t("userTable.userCreated", { role }));
        } else {
          throw new Error(t("userTable.creationFailed"));
        }
      });
    } catch (error) {
      alert(
        `Error: ${
          error instanceof Error ? error.message : t("userTable.unknownError")
        }`
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
