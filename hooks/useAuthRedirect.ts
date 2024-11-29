"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.push("/auth/login");
      }
    };

    setTimeout(checkAuth, 300);
  }, [router]);
};

export default useAuthRedirect;
