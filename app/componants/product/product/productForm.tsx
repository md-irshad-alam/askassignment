import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Button,
} from "@mui/material";
import axios from "axios";
import { fetchWithAuth } from "@/app/utils/fetchUtils";

const AddProductForm = ({ renderForm }: any) => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const [image, setImageUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  // Function to handle file upload
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "pdf"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Mock API Call (Replace with your actual file upload API)
      const response = await axios.post("api/upload", formData, {
        withCredentials: true,
      });

      // Update the state with the uploaded file URL
      const fileUrl = response.data.fileUrl; // Get the uploaded file URL

      if (type === "image") {
        setImageUrl(fileUrl);
      } else {
        setPdfUrl(fileUrl);
      }
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };
  const [desc, setDescription] = useState({
    title: "",
    heading: "",
    content: "",
  });
  const handleDescription = (event: any) => {
    setDescription({ ...desc, [event.target.name]: event.target.value });
  };
  console.log(image);
  const [featureContents, setFeatureContents] = useState<
    { [key: string]: string }[]
  >([]);
  const handleFeatureContent = (event: any) => {
    setFeatureContents([{ content: event.target.value }]);
  };
  const [uploadfile, setUploadFile] = useState<
    { heading: string; fileurl: string }[]
  >([]);
  const handleUploadFile = (event: any) => {
    const newData = { heading: event.target.value, fileurl: pdfUrl || "" };
    setUploadFile([newData]);
  };
  // Handle form submission
  const handleSubmit = async () => {
    const productData = {
      category,
      subCategory,
      productName,
      shortDescription,
      image,
      desc,
      uploadfile,
      feature: featureContents,
    };

    try {
      const res = await fetchWithAuth("/api/product/products", "POST", {
        body: JSON.stringify(productData),
      })
        .then((response) => {
          console.log("Product added successfully:", response);
          window.alert("Product added successfully");
          renderForm(true);
        })
        .catch((error) => {
          window.alert("Error adding product: " + error.message);
        });

      // Reset form inputs
    } catch (error) {}
    // Send `productData` to backend API here
  };

  const [subCategoryData, setSubCategoryData] = useState([]);
  useEffect(() => {
    const getSubCategory = async () => {
      try {
        const res = await fetchWithAuth("/api/product/subcategory");
        setSubCategoryData(res);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getSubCategory();
  }, []);

  return (
    <Container maxWidth="md" className="text-black shadow p-4">
      <Typography variant="h4" gutterBottom>
        Add Product
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InputLabel>Select Category</InputLabel>
          <FormControl fullWidth>
            <Select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {subCategoryData?.map((category) => (
                <MenuItem key={category._id} value={category.category}>
                  {category.category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <InputLabel>Select Sub Category</InputLabel>
          <FormControl fullWidth>
            <Select
              name="subCategory"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              {subCategoryData?.map((subCategory) => (
                <MenuItem key={subCategory._id} value={subCategory.subCategory}>
                  {subCategory.subCategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <InputLabel>Product Name</InputLabel>
          <TextField
            fullWidth
            label="Product Name"
            variant="outlined"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel>Upload Image</InputLabel>
          <TextField
            fullWidth
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={(e) => handleFileUpload(e, "image")}
            variant="outlined"
          />
          {image && <img src={image} alt="Uploaded" width="100" />}
        </Grid>

        <Grid item xs={12}>
          <InputLabel>Short Description</InputLabel>
          <TextareaAutosize
            minRows={3}
            style={{ width: "100%" }}
            className="border"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom marginTop={4}>
        Description
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputLabel>Title</InputLabel>
          <TextField
            fullWidth
            placeholder="Title"
            variant="outlined"
            name="title"
            value={desc.title}
            onChange={handleDescription}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel>Heading</InputLabel>
          <TextField
            fullWidth
            placeholder="Heading"
            variant="outlined"
            name="heading"
            value={desc.heading}
            onChange={handleDescription}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel>Description</InputLabel>
          <TextField
            fullWidth
            placeholder="Description"
            name="content"
            value={desc.content}
            onChange={handleDescription}
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom marginTop={4}>
        Features
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputLabel>Content</InputLabel>
          <TextareaAutosize
            minRows={5}
            style={{ width: "100%" }}
            className="border"
            onChange={handleFeatureContent}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom marginTop={4}>
        Upload PDF
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InputLabel>PDF Heading</InputLabel>
          <TextField
            fullWidth
            placeholder="PDF Heading"
            variant="outlined"
            name="heading"
            onChange={handleUploadFile}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel>Upload PDF</InputLabel>
          <TextField
            fullWidth
            type="file"
            inputProps={{ accept: ".pdf" }}
            onChange={(e) => handleFileUpload(e, "pdf")}
            variant="outlined"
          />
          {pdfUrl && (
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          )}
        </Grid>
      </Grid>

      <div className="mt-6">
        <Grid item xs={12} className="flex justify-end gap-x-4 m">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => renderForm(true)}
          >
            Cancel
          </Button>
        </Grid>
      </div>
    </Container>
  );
};

export default AddProductForm;
