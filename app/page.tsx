"use client"
import useAuthRedirect from "@/hooks/useAuthRedirect";

export default function page() {
  useAuthRedirect();

  return <div>Home</div>;
}
