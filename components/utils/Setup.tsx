"use client";

import { useVerify } from "@/hooks";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Toast() {
  useVerify();
  return <ToastContainer />;
}
