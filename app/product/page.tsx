"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CategoryForm from "../componants/product/category/categoryForm";
import SubcategoryForm from "../componants/product/subcategory/subcategoryForm";
import AddProductForm from "../componants/product/product/productForm";
import { ProductTable } from "../componants/product/product/productTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [renderForm, setRenderForm] = React.useState(true);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Add Category" {...a11yProps(0)} />
          <Tab label="Add Sub Category" {...a11yProps(1)} />
          <Tab label="Add Product" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CategoryForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SubcategoryForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {renderForm == false ? (
          <AddProductForm renderForm={setRenderForm} />
        ) : (
          <ProductTable renderForm={setRenderForm} />
        )}
      </CustomTabPanel>
    </Box>
  );
}
