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
import { Button } from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProductTable({ renderForm }: any) {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchWithAuth("api/product/products", "GET");
        const data = await response?.products;
        console.log(data);
        setRows(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    getProducts();
  }, []);
  console.log(rows);
  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <div className="bg-white divide-y divide-gray-200">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Product List
          </h3>
          <Button
            variant="contained"
            color="primary"
            onClick={() => renderForm(false)}
          >
            Add Product
          </Button>
        </div>
      </div>
      <div className="p-4">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell>Sub Category</StyledTableCell>
                <StyledTableCell>Product Name</StyledTableCell>
                <StyledTableCell>Short Description</StyledTableCell>
                <StyledTableCell>Full Description</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align="right">Edit</StyledTableCell>
                <StyledTableCell align="right">Remove</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row: any, index: any) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {row.category}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.subcategory}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.productname}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.shortDescription}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.desc?.map((item: any) => item.content)}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    {row.isActive == true ? "Active" : "De-Active"}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <IconEdit color="blue" />
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <IconTrash color="red" />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
