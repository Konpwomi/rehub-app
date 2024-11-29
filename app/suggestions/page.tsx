"use client"
import useAuthRedirect from "@/hooks/useAuthRedirect";
import React from "react";

export default function Suggestions() {
  useAuthRedirect();
  return <div>Suggestions</div>;
}
