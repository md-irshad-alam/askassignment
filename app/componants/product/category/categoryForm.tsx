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

  let initialData;
  const [selectedCategories, setSelectedCategories] = useState({});
  const [inputField, setIputField] = useState<InputField>(initialData || {});

  const [categoryData, setCategorydata] = useState<Category[]>([]);
  const handleChagne = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIputField({ ...inputField, [event.target.name]: event.target.value });
  };
  const [isUpdata, setUpdate] = useState(false);

  const handleUpdate = async (item: any) => {
    const { _id, isActive, category } = item;
    setUpdate(true);
    const newItem = {
      id: _id,
      category: category,
      isActive: isActive,
    };
    setIputField(newItem);
  };

  const handleSubmitUpdate = async () => {
    await fetchWithAuth(`/api/product/category`, "PUT", {
      body: JSON.stringify(inputField),
    }).then((response) => {
      console.log("Successfully updated category", response);
      setUpdate(false);
      fetchData();
      window.alert("Successfully updated category");
    });
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
    handleUpdate;
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
              value={inputField.category}
              onChange={handleChagne}
              fullWidth
            />
          </Grid>
          {/* <Grid item xs={3} mt={4}>
            <FormControlLabel
              control={
                <Checkbox
                  value={inputField.isActive}
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
          </Grid> */}
          <Grid item xs={3} mt={4}>
            <FormControlLabel
              name="isActive"
              value={inputField?.isActive}
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
            {isUpdata ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitUpdate}
              >
                Update Category
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Add Category
              </Button>
            )}

            <Button variant="contained" color="secondary">
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} mt={4}>
            <CategoryTable
              initialData={categoryData}
              setCategories={setCategorydata}
              handleUpdate={handleUpdate}
            />
          </Grid>
        </Grid>
        <br />
      </>
    </div>
  );
};

export default CategoryForm;
