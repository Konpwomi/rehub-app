"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3,
  Home,
  Award,
  Gamepad2,
  BookMarked,
  MessageCircleQuestion,
  ClipboardPlus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems = [
  { icon: Home, label: "หน้าแรก", href: "/" },
  { icon: Gamepad2, label: "โปรแกรมฟื้นฟู", href: "/recovery" },
  { icon: BarChart3, label: "สถิติ", href: "/statistic" },
  { icon: ClipboardPlus, label: "คำแนะนำคุณหมอ", href: "/suggestions" },
  { icon: Award, label: "ภารกิจ", href: "/mission" },
  { icon: BookMarked, label: "สารานุกรม", href: "/encyclopedia" },
  { icon: MessageCircleQuestion, label: "คำถามที่พบบ่อย", href: "/faq" },
];


export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/register";

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    router.push("/auth/login");
  };

  return isAuthPage ? (
    <div className="">
      {children}
    </div>
  ) : (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 flex-col border-r bg-white">
        <h1 className="p-4 text-center text-xl font-bold">Rehub</h1>
        <ScrollArea className="flex-1">
          <nav className="space-y-2 p-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 rounded-lg p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-end border-b bg-white p-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="font-semibold" onClick={handleLogout}>
              <span>Logout</span>
            </Button>
          </div>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
