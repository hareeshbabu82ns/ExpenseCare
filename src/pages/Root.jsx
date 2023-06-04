import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import authSlice, { authActions } from "../store/auth-slice";

function Root() {
  const isLoggedIn = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);

  return <>{isLoggedIn && <Outlet />}</>;
}

export default Root;
