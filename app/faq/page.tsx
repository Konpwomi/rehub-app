"use client"
import useAuthRedirect from "@/hooks/useAuthRedirect";
import React from "react";

export default function Faq() {
  useAuthRedirect();
  return <div>Faq</div>;
}
