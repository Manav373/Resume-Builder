import { UserButtonComponent } from "@/components/auth-provider";
import { LayoutDashboard, FileText, Briefcase, Settings } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

import { ModeToggle } from "@/components/mode-toggle";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: FileText, label: "Resumes", href: "/dashboard/resumes" },
    { icon: Briefcase, label: "Portfolios", href: "/dashboard/portfolios" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout() {
    const location = useLocation();

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-card hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        AI Builder
                    </h1>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <UserButtonComponent />
                        <span className="text-sm font-medium">Account</span>
                    </div>
                    <div className="flex items-center justify-between px-4 mt-4">
                        <span className="text-sm font-medium text-muted-foreground">Theme</span>
                        <ModeToggle />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
