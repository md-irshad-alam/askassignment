import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  const [subcategory, setSubCategory] = useState("");
  const [productname, setProductName] = useState("");
  const [shortdesc, setshortdesc] = useState("");
  const [pdfheading, setpdfheaind] = useState("");
  const [image, setImageUrl] = useState("/screenshoot.png");
  const [pdfUrl, setPdfUrl] = useState("");
  const [uploadfile, setUploadFile] = useState<
    { heading: string; fileurl: string }[]
  >([]);
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
      setImageUrl("/screenshoot.png");
      setPdfUrl("/screensh.pdf");
      console.error("File upload failed:", error);
    }
  };
  console.log("pdf file name ", pdfUrl);
  const [desc, setDescription] = useState({
    title: "",
    heading: "",
    content: "",
  });
  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription({ ...desc, [event.target.name]: event.target.value });
  };

  const [featureContents, setFeatureContents] = useState<
    { [key: string]: string }[]
  >([]);
  const handleFeatureContent = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFeatureContents([{ content: event.target.value }]);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const productData = {
      category,
      subcategory,
      productname,
      shortdesc,
      image: image,
      desc,
      uploadfile: [{ heading: pdfheading, fileurl: pdfUrl }],
      feature: featureContents,
    };

    try {
      await fetchWithAuth("/api/product/products", "POST", {
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
    } catch (error) {
      console.error("Error adding product:", error);
      window.alert("Error adding product: " + (error as Error).message);
    }
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
              name="subcategory"
              value={subcategory}
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
            variant="outlined"
            value={productname}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <InputLabel>Upload Image</InputLabel>
          <TextField
            fullWidth
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFileUpload(e, "image")
            }
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
            value={shortdesc}
            onChange={(e) => setshortdesc(e.target.value)}
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
            onChange={(event: any) => setpdfheaind(event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel>Upload PDF</InputLabel>
          <TextField
            fullWidth
            type="file"
            inputProps={{ accept: ".pdf" }}
            onChange={(e: any) => handleFileUpload(e, "pdf")}
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
