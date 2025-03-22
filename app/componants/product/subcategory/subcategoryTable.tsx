import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconEdit } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { fetchWithAuth } from "@/app/utils/fetchUtils";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
interface RowData {
  category: string;
  subCategory: string;
  isActive: boolean;
}

interface CategoryTableProps {
  initialData: RowData[];
  onEdit?: (item: any) => void;
  subCategory: string;
}
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const SubCategoryTable: React.FC<CategoryTableProps> = ({
  initialData,
  onEdit,
  subCategory,
}) => {
  const rows = initialData || [{}];
  console.log("rows", rows);
  const handleDelete = async (id: string) => {
    // delete api call
    await fetchWithAuth(`/api/product/subcategory`, "DELETE", {
      body: JSON.stringify({ id }),
    });
    // update the state
    subCategory(initialData.filter((c: any) => c._id !== id));
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Sub Category</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Remove</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.category}
              </StyledTableCell>
              <StyledTableCell align="right">{row.subCategory}</StyledTableCell>

              <StyledTableCell align="right">
                {row.isActive == true ? "Active" : "De-Active"}
              </StyledTableCell>

              <StyledTableCell
                align="center"
                className="cursor-pointer"
                onClick={() => onEdit(row)}
              >
                <IconEdit color="blue" />
              </StyledTableCell>

              <StyledTableCell
                align="center"
                className="cursor-pointer"
                onClick={() => handleDelete(row._id)}
              >
                <IconTrash color="red" />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
