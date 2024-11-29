"use client"
import useAuthRedirect from "@/hooks/useAuthRedirect";
import React from "react";

export default function Recovery() {
  useAuthRedirect();
  return <div>Recovery</div>;
}
