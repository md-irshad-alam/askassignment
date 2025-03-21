"use client";

import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { IconEyeClosed } from "@tabler/icons-react";
import { IconEyeDotted } from "@tabler/icons-react";

export default function AuthPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isSignup: false, // Toggle between login and signup
  });

  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle Password Visibility
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = formData.isSignup
      ? "/api/auth/register"
      : "/api/auth/login";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });

    if (res.ok) {
      if (!formData.isSignup) {
        window.location.href = "/";
      }
    } else {
      // Handle error
      console.error("Failed to submit form");
    }

    setFormData({ name: "", email: "", password: "", isSignup: false });
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={5}
        sx={{
          padding: 4,
          textAlign: "center",
          mt: 5,
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          {formData.isSignup ? "Sign Up" : "Login"}
        </Typography>

        <form onSubmit={handleSubmit}>
          {formData.isSignup && (
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
          )}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {showPassword ? <IconEyeClosed /> : <IconEyeDotted />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
            {formData.isSignup ? "Sign Up" : "Login"}
          </Button>

          <Typography
            variant="body2"
            sx={{ cursor: "pointer", color: "blue", mt: 1 }}
            onClick={() =>
              setFormData({ ...formData, isSignup: !formData.isSignup })
            }
          >
            {formData.isSignup
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Typography>
        </form>
      </Paper>
    </Container>
  );
}
