import { useRef, useState } from "react";
import { CustomButton } from "@components/utils/custom-button";
import Link from "next/link";
import { UploadDialog } from "@components/layout/upload-dialog";
import React from "react";
import { FieldConfig } from "@/src/types/intefaces";
import { getNestedValue } from "@utils/functios-utils";
import { RelatorioButton, RelatorioButtonRef } from "@components/utils/relatorio-button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = { [key: string]: any };

interface ItemListProps<T> {
    items: T[];
    fields: FieldConfig[];
    onItemClick: (item: T) => void;
    titulo: string;
    rotaCadastro?: string;
    isCadastrar?: boolean;
    isImportar?: boolean;
    isGerarRelatorio?: boolean;
    onFileUpload?: (file: File) => void;
    itemsPerPage?: number;
    renderActions?: (item: T) => React.ReactNode;
}

export const CustomListGrid = <T extends Item>({
    items,
    fields,
    onItemClick,
    titulo,
    rotaCadastro,
    isCadastrar,
    isImportar,
    isGerarRelatorio,
    onFileUpload,
    itemsPerPage = 10,
    renderActions,
}: ItemListProps<T>) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [openUpload, setOpenUpload] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const relatorioRef = useRef<RelatorioButtonRef>(null);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const renderFieldValue = (item: T, field: FieldConfig) => {
        if (field.render) {
            return field.render(item);
        }
        const value = getNestedValue(item, field.value);
        return value ?? 'N/A';
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{titulo}</h2>
                <div className="space-x-2">

                    {renderActions && (
                        <>
                            {renderActions && (
                                <>
                                    {renderActions(items[selectedIndex ?? 0])}
                                </>
                            )}
                        </>
                    )}

                    {isGerarRelatorio && (
                        <>
                            <CustomButton
                                onClick={() => {
                                    if (selectedIndex !== null) {
                                        relatorioRef.current?.gerarRelatorio();
                                    }
                                }}
                                variant="outline"
                                className="bg-amber-800 text-white p-2 rounded w-28">
                                Gerar Relatório
                            </CustomButton>

                            {selectedIndex !== null && (
                                <RelatorioButton
                                    ref={relatorioRef}
                                    pedidoData={items[selectedIndex]}
                                    templateName="pedido-relatorio"
                                />
                            )}
                        </>
                    )}

                    {isCadastrar && (
                        <>
                            <CustomButton asChild variant="outline"
                                className="bg-cyan-900 text-white p-2 rounded w-28">
                                <Link href={rotaCadastro ?? '/'}>Cadastrar</Link>
                            </CustomButton>
                        </>
                    )}

                    {isImportar && onFileUpload && (
                        <>
                            <CustomButton onClick={() => setOpenUpload(true)}
                                variant="outline" className="bg-amber-700 text-white p-2 rounded w-28">
                                Importar
                            </CustomButton>
                            <UploadDialog onFileUpload={onFileUpload}
                                open={openUpload} onOpenChange={setOpenUpload} />
                        </>
                    )}
                </div>
            </div>

            <div className="grid ml-2 p-1"
                style={{ gridTemplateColumns: fields.map(f => f.width ?? 'minmax(120px, 1fr)').join(' ') }}>
                {fields.map(({ label, value }, idx) => (
                    <div key={value} className={`text-xs font-semibold text-gray-600 uppercase tracking-wide
                     ${idx !== 0 ? 'border-l border-gray-300 pl-2' : ''}`}>
                        {label}
                    </div>
                ))}
            </div>

            {currentItems.map((item, index) => {
                const globalIndex = startIndex + index;

                return (
                    <div key={index}
                        onClick={() => {
                            setSelectedIndex(globalIndex);
                            onItemClick(item);
                        }}
                        className={`cursor-pointer border rounded-md shadow-sm p-3 transition 
                ${selectedIndex === globalIndex
                                ? "bg-blue-100 border-blue-500 ring-2 ring-blue-500"
                                : "bg-white border-gray-300 hover:ring-2 hover:ring-blue-500"
                            }`}>

                        <div className="grid"
                            style={{ gridTemplateColumns: fields.map(f => f.width ?? 'minmax(120px, 1fr)').join(' ') }}>
                            {fields.map((field, idx) => (
                                <div key={field.value}
                                    className={`text-gray-700 ${field.fontSize === 'xs' ? 'text-xs' : 'text-sm'} p-1 ${idx !== 0 ? 'border-l border-gray-200 pl-2' : ''}`}
                                >
                                    {renderFieldValue(item, field)}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}


            {/* Paginacao */}
            <div className="flex justify-between items-center mt-4">
                <CustomButton
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="bg-gray-500 text-white p-2 rounded w-28">
                    Anterior
                </CustomButton>
                <span className="text-sm">
                    Página {currentPage} de {totalPages}
                </span>
                <CustomButton
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-500 text-white p-2 rounded w-28">
                    Próxima
                </CustomButton>
            </div>
        </div>
    );
};
