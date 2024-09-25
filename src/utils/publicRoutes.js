import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

function PublicRoutes() {
  //   const token = useAuth();
  const token = false;

  return token ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes;
