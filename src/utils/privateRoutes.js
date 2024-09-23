import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function PrivateRoutes() {
  const token = useAuth();
  console.log("Token value:", token);

  return token ? <Outlet /> : <Navigate to="/home" />;
}
