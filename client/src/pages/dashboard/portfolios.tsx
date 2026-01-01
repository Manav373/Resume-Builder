import { Hammer } from "lucide-react";

export default function PortfoliosPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="p-4 bg-primary/10 rounded-full animate-in zoom-in-0 duration-700 delay-200 fill-mode-both">
                <Hammer className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight animate-in slide-in-from-bottom-2 duration-700 delay-300 fill-mode-both">Portfolios Coming Soon</h1>
            <p className="text-muted-foreground max-w-md animate-in slide-in-from-bottom-2 duration-700 delay-500 fill-mode-both">
                We are currently building the AI Portfolio Generator. Stay tuned for updates!
            </p>
        </div>
    );
}
