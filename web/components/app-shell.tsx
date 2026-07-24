"use client";

import Link from "next/link";
import { LayoutDashboard, Stethoscope, History, User, Settings, Search, Bell, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/theme-toggle";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Screening", href: "/screening", icon: Stethoscope },
  { label: "History", href: "/history", icon: History },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
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
        <div className="p-4 font-heading font-bold text-lg text-primary">GeneScope AI</div>
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 gap-4">
          <Sheet>
            <SheetTrigger className="md:hidden p-2 rounded-lg hover:bg-muted" aria-label="Open menu">
                <Menu size={20} />
            </SheetTrigger>
            <SheetContent side="left" className="w-60 p-0">
              <div className="p-4 font-heading font-bold text-lg text-primary">GeneScope AI</div>
              <SidebarContent />
            </SheetContent>
          </Sheet>

          <div className="flex-1 max-w-sm hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border bg-background">
            <Search size={16} className="text-muted-foreground" />
            <Input
              placeholder="Search history, factors..."
              className="border-0 shadow-none focus-visible:ring-0 h-auto p-0"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <ThemeToggle />
            <button className="p-2 rounded-lg hover:bg-muted relative" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger aria-label="Profile menu">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">A</AvatarFallback>
                </Avatar>
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