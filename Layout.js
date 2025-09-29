import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, 
  Server, 
  History, 
  Settings, 
  Shield,
  User,
  Bell,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "Assets",
    url: createPageUrl("Assets"), 
    icon: Server,
  },
  {
    title: "Scan Results",
    url: createPageUrl("ScanResults"),
    icon: History,
  },
  {
    title: "Settings",
    url: createPageUrl("Settings"),
    icon: Settings,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-900 text-slate-200">
        <Sidebar className="border-r border-slate-200 bg-white text-slate-800">
          <SidebarHeader className="border-b border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-400 rounded-lg flex items-center justify-center shadow-md">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">SecureAudit</h2>
                <p className="text-xs text-slate-500">Enterprise Security</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 py-2">
                Main Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-slate-100 hover:text-blue-600 transition-all duration-200 rounded-lg mb-1 group ${
                          location.pathname === item.url 
                            ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:text-white' 
                            : 'text-slate-600'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 text-sm">Security Admin</p>
                <p className="text-xs text-slate-500">admin@company.com</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden text-slate-300 hover:bg-slate-800 p-2 rounded-lg transition-colors duration-200" />
              <div>
                <h1 className="text-2xl font-bold text-white">{currentPageName}</h1>
                <p className="text-slate-400 text-sm">Real-time security and compliance monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative p-2 rounded-full hover:bg-slate-800 transition-colors duration-200">
                    <Bell className="w-5 h-5 text-slate-300" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-slate-800 border-slate-700 text-slate-200" align="end">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700"/>
                  <DropdownMenuItem className="focus:bg-slate-700">New critical vulnerability found</DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-slate-700">Scan 'scan-12345' completed</DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-slate-700">Compliance score dropped to 84%</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-700 text-slate-200" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700"/>
                  <DropdownMenuItem className="focus:bg-slate-700 flex items-center gap-2"><User className="w-4 h-4" /> Profile</DropdownMenuItem>
                  <DropdownMenuItem className="focus:bg-slate-700 flex items-center gap-2"><Settings className="w-4 h-4" /> Settings</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700"/>
                  <DropdownMenuItem className="text-red-400 focus:bg-red-900/50 focus:text-red-400 flex items-center gap-2"><LogOut className="w-4 h-4" /> Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main content area */}
          <div className="flex-1 overflow-auto bg-slate-900">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}