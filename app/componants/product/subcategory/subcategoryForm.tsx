"use client";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoryTable from "./subcategoryTable";
import { fetchWithAuth } from "@/app/utils/fetchUtils";

const SubcategoryForm = ({ initialData }: any) => {
  const [inputField, setIputField] = useState({});
  const handleChagne = (event: any) => {
    setIputField({ ...inputField, [event.target.name]: event.target.value });
  };
  console.log(inputField);
  const [subCategopryData, setsubCategorydata] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const handleSave = async (event: any) => {
    event.preventDefault();
    try {
      let res = await fetchWithAuth("/api/product/subcategory", "POST", {
        body: JSON.stringify(inputField),
      }).then((response) => {
        fetchData();
        window.alert("Successfully added category");
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchData = async () => {
    try {
      let res = await fetchWithAuth("/api/product/subcategory");
      setsubCategorydata(res.flat(Infinity));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    const getCategory = async () => {
      try {
        let data = await fetchWithAuth("/api/product/category");
        setCategoryData(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
    getCategory();
  }, []);
  return (
    <div className=" shadow-lg p-4 mt-12">
      <>
        <Grid container spacing={2} className="text-black">
          <Grid item xs={6}>
            <InputLabel>Select Category </InputLabel>
            <Select name="category" onChange={handleChagne} fullWidth>
              {categoryData?.map((item) => (
                <MenuItem key={item._id} value={item.category}>
                  {item.category}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel>Sub Category name</InputLabel>
            <TextField
              type="text"
              name="subCategory"
              onChange={handleChagne}
              fullWidth
            />
          </Grid>
          <Grid item xs={3} mt={4}>
            <FormControlLabel
              name="isActive"
              control={
                <Checkbox
                  onChange={(event) => {
                    setIputField({
                      ...inputField,
                      [event.target.name]: event.target.checked,
                    });
                  }}
                />
              }
              label="Active"
            />
          </Grid>

          <Grid item xs={12} className="flex justify-end mt-3 gap-x-4">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Category
            </Button>

            <Button variant="contained" color="secondary">
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} mt={4}>
            <CategoryTable initialData={subCategopryData} />
          </Grid>
        </Grid>
        <br />
      </>
    </div>
  );
};

export default SubcategoryForm;
