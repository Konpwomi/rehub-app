"use client"
import useAuthRedirect from "@/hooks/useAuthRedirect";
import React from "react";

export default function Statistic() {
  useAuthRedirect();
  return <div>Statistic</div>;
}
