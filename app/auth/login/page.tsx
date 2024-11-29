"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      router.push("/");
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      router.push("/");
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-xl">ยินดีต้อนรับสู่ Rehub</CardTitle>
          <CardDescription>
            ใส่อีเมลและรหัสผ่านของคุณเพื่อเข้าสู่บัญชีของคุณ
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">อีเมล</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ใส่อีเมลของคุณ"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"} // Toggle type
                  value={password}
                  placeholder="ใส่รหัสผ่านของคุณ"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-5 mt-4">
            <Button className="w-full" type="submit">
              เข้าสู่ระบบ
            </Button>
            <div className="flex items-center justify-center gap-3">
              <Separator className="px-7" />
              <p>หรือ</p>
              <Separator className="px-7" />
            </div>
            <Link className="w-full" href="/auth/register">
              <Button className="w-full" type="button">
                สมัครสมาชิก
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
