import React, { useImperativeHandle, useState } from "react";

export interface RelatorioButtonRef {
    gerarRelatorio: () => void;
}

interface RelatorioButtonProps {
    pedidoData: any;
    templateName: string;
    shouldReloadOnClose?: boolean;
    onStatusChange?: (status: 'loading' | 'done' | 'error') => void;
}

export const RelatorioButton = React.forwardRef<RelatorioButtonRef, RelatorioButtonProps>(
    ({ pedidoData, templateName, shouldReloadOnClose, onStatusChange }, ref) => {
        const [isDialogOpen, setIsDialogOpen] = useState(false);
        const [pdfUrl, setPdfUrl] = useState<string | null>(null);

        const gerarRelatorio = async () => {
            try {
                onStatusChange?.('loading'); 
                const res = await fetch('/api/generate-pdf', {
                    method: 'POST',
                    body: JSON.stringify({
                        templateName,
                        data: pedidoData
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
                setIsDialogOpen(true);
                 onStatusChange?.('done');
            } catch (error) {
                console.error("Erro ao gerar relatório:", error);
                onStatusChange?.('error');
            }
        };

        useImperativeHandle(ref, () => ({
            gerarRelatorio
        }));

        return (
            <>
                {isDialogOpen && pdfUrl && (
                    <dialog open className="fixed w-[100%] h-[100%] inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white w-[90%] h-[90%] rounded shadow-lg flex flex-col overflow-hidden">
                            <div className="flex justify-end p-2">
                                <button
                                    onClick={() => {
                                        setIsDialogOpen(false);
                                        setTimeout(() => {
                                            if (shouldReloadOnClose) {
                                                window.location.reload();
                                            }
                                        }, 300);
                                    }}
                                    className="text-blue-600 hover:underline">
                                    Fechar
                                </button>
                            </div>
                            <iframe
                                src={pdfUrl}
                                className="flex-1 w-full"
                                style={{ border: "none" }}
                            />
                        </div>
                    </dialog>
                )}

            </>
        );
    }
);

RelatorioButton.displayName = "RelatorioButton";