import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const columns = [
  { id: "nume", label: "Nume", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "rol", label: "Rol", minWidth: 100 },
  { id: "actions", label: "Actiuni", minWidth: 100 },
];
var deleteIcon = (
  <IconButton onClick={console.log("delete")}>
    <DeleteIcon style={{ color: "#F50057" }} />
  </IconButton>
);

const editIcon = (
  <IconButton onClick={console.log("edited")}>
    <EditIcon style={{ color: "#00B4D8" }} />
  </IconButton>
);
function createData(nume, email, rol, actions) {
  return { nume, email, rol, actions };
}

const rows = [
  createData(
    "Table Cell",
    "Table Cell",
    "Table Cell",
    <>
      {editIcon}
      {deleteIcon}
    </>
  ),
  createData(
    "Table Cell",
    "Table Cell",
    "Table Cell",
    <>
      {editIcon}
      {deleteIcon}
    </>
  ),
  createData(
    "Table Cell",
    "Table Cell",
    "Table Cell",
    <>
      {editIcon}
      {deleteIcon}
    </>
  ),
  createData(
    "Table Cell",
    "Table Cell",
    "Table Cell",
    <>
      {editIcon}
      {deleteIcon}
    </>
  ),
  createData(
    "Table Cell",
    "Table Cell",
    "Table Cell",
    <>
      {editIcon}
      {deleteIcon}
    </>
  ),
  createData(
    "Table Cell",
    "Table Cell",
    "Table Cell",
    <>
      {editIcon}
      {deleteIcon}
    </>
  ),
  createData(
    "Table Cell",
    "Table Cell",
    "Table Cell",
    <>
      {editIcon}
      {deleteIcon}
    </>
  ),
  createData(
    "Table Cell",
    "Table Cell",
    "Table Cell",
    <>
      {editIcon}
      {deleteIcon}
    </>
  ),
  createData(
    "Table Cell",
    "Table Cell",
    "Table Cell",
    <>
      {editIcon}
      {deleteIcon}
    </>
  ),
  createData(
    "Table Cell",
    "Table Cell",
    "Table Cell",
    <>
      {editIcon}
      {deleteIcon}
    </>
  ),
  createData(
    "Table Cell",
    "Table Cell",
    "Table Cell",
    <>
      {editIcon}
      {deleteIcon}
    </>
  ),
  createData(
    "Table Cell",
    "Table Cell",
    "Table Cell",
    <>
      {editIcon}
      {deleteIcon}
    </>
  ),
  createData(
    "Table Cell",
    "Table Cell",
    "Table Cell",
    <>
      {editIcon}
      {deleteIcon}
    </>
  ),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 650,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
