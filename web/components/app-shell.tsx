"use client";

import Link from "next/link";
import { LayoutDashboard, Stethoscope, History, User, Settings, Search, Bell, Menu, Home } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/theme-toggle";
import { MessageCircle } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Screening", href: "/screening", icon: Stethoscope },
  { label: "History", href: "/history", icon: History },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "AI Assistant", href: "/assistant", icon: MessageCircle },
];

function SidebarContent() {
  return (
    <nav className="flex flex-col gap-1 p-4">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <item.icon size={18} />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:flex w-60 border-r bg-card flex-col">
        <Link href="/" className="p-4 font-heading font-bold text-lg text-primary flex items-center gap-2">
          <img src="/logo.png" alt="GeneScope AI" className="h-8 w-8 rounded-md" />
          GeneScope AI
        </Link>
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 gap-4">
          <Sheet>
            <SheetTrigger suppressHydrationWarning className="md:hidden p-2 rounded-lg hover:bg-muted" aria-label="Open menu">
              <Menu size={20} />
            </SheetTrigger>
            <SheetContent side="left" className="w-60 p-0">
              <Link href="/" className="p-4 font-heading font-bold text-lg text-primary flex items-center gap-2">
                <img src="/logo.png" alt="GeneScope AI" className="h-8 w-8 rounded-md" />
                GeneScope AI
              </Link>
              <SidebarContent />
            </SheetContent>
          </Sheet>

          <div className="flex-1 max-w-sm hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border bg-background">
            <Search size={16} className="text-muted-foreground" />
            <Input
              suppressHydrationWarning
              placeholder="Search history, factors..."
              className="border-0 shadow-none focus-visible:ring-0 h-auto p-0"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger suppressHydrationWarning aria-label="Notifications" className="p-2 rounded-lg hover:bg-muted relative outline-none cursor-pointer">
                <Bell size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-4 text-sm text-muted-foreground min-w-[200px] text-center">
                No notifications yet
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger suppressHydrationWarning aria-label="Profile menu" className="p-2 rounded-lg hover:bg-muted outline-none cursor-pointer">
                <User size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem render={<Link href="/profile">Profile</Link>} />
                <DropdownMenuItem render={<Link href="/settings">Settings</Link>} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}