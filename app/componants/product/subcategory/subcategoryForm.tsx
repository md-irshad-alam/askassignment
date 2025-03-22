"use client";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { fetchWithAuth } from "@/app/utils/fetchUtils";
import { SubCategoryTable } from "./subcategoryTable";

interface InputField {
  category?: string;
  subCategory?: string;
  isActive?: boolean;
}

interface Category {
  id: string;
  _id: string;
  subCategory: string;
  category: string;
}

const SubcategoryForm = () => {
  const [inputField, setIputField] = useState<InputField>({});
  const handleChagne = (event: any) => {
    setIputField({
      ...inputField,
      [event.target.name]: event.target.value,
    });
  };
  console.log(inputField);
  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await fetchWithAuth("/api/product/subcategory", "POST", {
        body: JSON.stringify(inputField),
      }).then((response) => {
        console.log("response", response);
        fetchData();
        window.alert("Successfully added category");
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const [subCategopryData, setsubCategorydata] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const fetchData = async () => {
    try {
      const res = await fetchWithAuth("/api/product/subcategory");
      setsubCategorydata(res.flat(Infinity));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    const getCategory = async () => {
      try {
        const data = await fetchWithAuth("/api/product/category");
        setCategoryData(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
    getCategory();
  }, []);
  const [isEdit, setIsEdit] = useState(false);
  const handleEditChange = (item: any) => {
    if (item) {
      setIputField({
        id: item._id,
        category: item.category,
        subCategory: item.subCategory,
        isActive: item.isActive,
      });
      setIsEdit(true);
    }
  };
  const handleUpdate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await fetchWithAuth(`/api/product/subcategory`, "PUT", {
        body: JSON.stringify(inputField),
      }).then((response) => {
        console.log("response", response);
        fetchData();
        window.alert("Successfully updated category");
        setIsEdit(false);
      });
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  return (
    <div className=" shadow-lg p-4 mt-12">
      <>
        <Grid container spacing={2} className="text-black">
          <Grid item xs={6}>
            <InputLabel>Select Category </InputLabel>
            <Select
              name="category"
              onChange={handleChagne}
              value={inputField?.category}
              fullWidth
            >
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
              value={inputField?.subCategory}
              name="subCategory"
              onChange={handleChagne}
              fullWidth
            />
          </Grid>
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
            {isEdit ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                Update Category
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Category
              </Button>
            )}

            <Button variant="contained" color="secondary">
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} mt={4}>
            <SubCategoryTable
              initialData={subCategopryData}
              subCategory={setsubCategorydata}
              onEdit={handleEditChange}
            />
          </Grid>
        </Grid>
        <br />
      </>
    </div>
  );
};

export default SubcategoryForm;
