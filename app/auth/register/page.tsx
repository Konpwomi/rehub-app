"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from 'axios';
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

export default function Component() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        fullName: name,
        email,
        password,
      });
      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        router.push("/");
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to register. Please try again later.");
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
          สมัครสมาชิก
          </CardTitle>
          <CardDescription className="text-center">
            กรอกรายละเอียดเพื่อสมัครบัญชีใหม่
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">ชื่อ-นามสกุล</Label>
              <div className="relative">
                <UserIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                  size={20}
                />
                <Input
                  id="name"
                  placeholder="กรอกชื่อ-นามสกุลของคุณ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">อีเมล</Label>
              <div className="relative">
                <MailIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                  size={20}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="กรอกอีเมลของคุณ"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <div className="relative">
                <LockIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                  size={20}
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="สร้างรหัสผ่าน"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
              <div className="relative">
                <LockIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                  size={20}
                />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="ยืนยันรหัสผ่าน"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit">
              ลงทะเบียน
            </Button>
            <div className="text-center text-sm text-gray-500">
            มีบัญชีของคุณอยู่แล้ว?
              <Link href="/auth/login" className="text-blue-500 hover:underline">
                เข้าสู่ระบบ
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}