import { useRef, useState, useEffect } from 'react';
import type { ResumeData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Download, Printer, X } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ModernSidebar } from './templates/ModernSidebar';
import { Classic } from './templates/Classic';
import { Minimalist } from './templates/Minimalist';
import { Creative } from './templates/Creative';
import { Tech } from './templates/Tech';
import { Ivy } from './templates/Ivy';
import { Silicon } from './templates/Silicon';
import { Executive } from './templates/Executive';

interface ResumePreviewProps {
    open: boolean;
    onClose: () => void;
    data: ResumeData | null;
}

export function ResumePreview({ open, onClose, data }: ResumePreviewProps) {
    const componentRef = useRef<HTMLDivElement>(null);
    const [isContentVisible, setIsContentVisible] = useState(false);

    useEffect(() => {
        if (open) {
            // Delay to allow dialog animation to start first
            const timer = setTimeout(() => setIsContentVisible(true), 200);
            return () => clearTimeout(timer);
        } else {
            setIsContentVisible(false);
        }
    }, [open]);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: data?.personalInfo?.fullName ? `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume` : 'Resume',
    });

    const renderTemplate = () => {
        if (!data) return null;
        switch (data.templateId) {
            case 'executive':
                return <Executive data={data} />;
            case 'silicon':
                return <Silicon data={data} />;
            case 'ivy':
                return <Ivy data={data} />;
            case 'tech':
                return <Tech data={data} />;
            case 'creative':
                return <Creative data={data} />;
            case 'minimalist':
                return <Minimalist data={data} />;
            case 'classic':
                return <Classic data={data} />;
            case 'modern-sidebar':
            default:
                return <ModernSidebar data={data} />;
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-7xl h-[90vh] flex flex-col p-0 gap-0 duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom-12 data-[state=open]:slide-in-from-bottom-12 shadow-2xl border-none ring-1 ring-gray-200/50">
                <DialogHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0 bg-muted/30 transition-all duration-300 ease-in-out">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:scale-110 transition-transform duration-200">
                            <X className="w-4 h-4" />
                        </Button>
                        <DialogTitle className="animate-fade-in">Resume Preview</DialogTitle>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handlePrint()} className="hover:scale-105 transition-transform duration-200">
                            <Printer className="w-4 h-4 mr-2" />
                            Print / Save to PDF
                        </Button>
                        <Button variant="default" size="sm" onClick={() => handlePrint()} className="hover:scale-105 transition-transform duration-200">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                        </Button>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
                    {/* Printable Area - Wrapper for scaling if needed */}
                    <div
                        ref={componentRef}
                        className={`transition-opacity duration-700 ease-out ${isContentVisible ? 'opacity-100' : 'opacity-0'} transform ${isContentVisible ? 'translate-y-0' : 'translate-y-4'}`}
                    >
                        {renderTemplate()}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}