"use client";
import React from "react";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useState } from "react";
import { IconLogout } from "@tabler/icons-react";
import { Box } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { fetchWithAuth } from "@/app/utils/fetchUtils";
const Navbar = () => {
  const [user, setUser] = React.useState<any>(null);
  React.useEffect(() => {
    const getDetails = async () => {
      const res = await fetchWithAuth("/api/auth/login", "GET");

      console.log("data", res);
      setUser(res);
    };
    getDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await fetchWithAuth("/api/auth/logout", "POST");
      window.alert("logout successfully");
      window.location.href = "/auth";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <Box className="static border-b-2 border-gray-200 bg-gray-300 text-black text-xl">
      <Toolbar className="flex justify-between">
        <div className="flex items-center w-1/2 border-red-500">
          <img src="./logo.png" alt="Logo" className="h-10 object-cover mr-2" />
          {/* <Typography variant="h6" className="text-white">
            AKS Machine Test
          </Typography> */}
          <div className="flex items-center ml-6">
            <ul className="flex items-center gap-x-4">
              <li>
                <Link href="/"> Dashboard</Link>
              </li>
              <li>
                <Link href="/product"> Products</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          {user ? (
            <div className="flex items-center text-black text-xl gap-x-2">
              <IconButton>
                <Avatar>
                  {user?.name?.charAt(0)}
                  {user?.name?.charAt(user?.name?.length - 1)}
                </Avatar>
              </IconButton>
              <Typography variant="body1" className=" ml-2">
                {user?.name}
              </Typography>

              <Typography variant="body1" className="text-red-500 mr-1 ">
                ||
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  handleLogout();
                }}
              >
                <IconLogout color="red" />
              </Button>
            </div>
          ) : (
            <Link href="/auth">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </div>
      </Toolbar>
    </Box>
  );
};

export default Navbar;
