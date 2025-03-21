"use client";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoryTable from "./categoryTable";
import { fetchWithAuth } from "@/app/utils/fetchUtils";

const CategoryForm = ({ initialData }: any) => {
  console.log(initialData);
  const [inputField, setIputField] = useState({});

  const [categoryData, setCategorydata] = useState([]);
  const handleChagne = (event: any) => {
    setIputField({ ...inputField, [event.target.name]: event.target.value });
  };
  const handleSave = async (event: any) => {
    event.preventDefault();
    try {
      let res = await fetchWithAuth("/api/product/category", "POST", {
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
      let res = await fetchWithAuth("/api/product/category");
      setCategorydata(res);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // Add the category to your database or state here

  return (
    <div className=" shadow-lg p-4 mt-12">
      <>
        <Grid container spacing={2} className="text-black">
          <Grid item xs={6}>
            <InputLabel>Category name</InputLabel>
            <TextField
              type="text"
              name="category"
              onChange={handleChagne}
              fullWidth
            />
          </Grid>
          <Grid item xs={3} mt={4}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isActive"
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
            <CategoryTable categoryData={categoryData} />
          </Grid>
        </Grid>
        <br />
      </>
    </div>
  );
};

export default CategoryForm;
