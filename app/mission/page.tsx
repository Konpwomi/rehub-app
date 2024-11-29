"use client"
import useAuthRedirect from "@/hooks/useAuthRedirect";
import React from "react";

export default function Mission() {
  useAuthRedirect();
  return <div>Mission</div>;
}
