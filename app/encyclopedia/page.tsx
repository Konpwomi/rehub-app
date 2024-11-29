"use client"
import useAuthRedirect from "@/hooks/useAuthRedirect";
import React from "react";

export default function Encyclopedia() {
  useAuthRedirect();
  return <div>Encyclopedia</div>;
}
