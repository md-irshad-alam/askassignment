"use client";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { fetchWithAuth } from "@/app/utils/fetchUtils";
import { CategoryTable } from "./categoryTable";

interface InputField {
  category?: string;
  isActive?: boolean;
}

interface Category {
  id: number;
  category: string;
  subCategory: string;
  isActive: boolean;
}

const CategoryForm = () => {
  //
  const [inputField, setIputField] = useState<InputField>({});

  const [categoryData, setCategorydata] = useState<Category[]>([]);
  const handleChagne = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIputField({ ...inputField, [event.target.name]: event.target.value });
  };

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await fetchWithAuth("/api/product/category", "POST", {
        body: JSON.stringify(inputField),
      }).then((response) => {
        console.log("Successfully added category", response);
        fetchData();
        window.alert("Successfully added category");
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchData = async () => {
    try {
      const res = await fetchWithAuth("/api/product/category");
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
            <CategoryTable initialData={categoryData} />
          </Grid>
        </Grid>
        <br />
      </>
    </div>
  );
};

export default CategoryForm;
