import { useState } from "react";
import { CustomButton } from "@components/layout/custom-button";
import Link from "next/link";
import { UploadDialog } from "@components/layout/upload-dialog";
import React, { FC } from "react";

type Item = { [key: string]: any };

interface ItemListProps<T> {
    items: T[];
    fields: { label: string; value: string }[];
    onItemClick: (item: T) => void;
    titulo: string;
    novoRota?: string;
    importar?: boolean;
    cadastrar?: boolean;
    onFileUpload?: (file: File) => void;
    itemsPerPage?: number;
}

const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const CustomListGrid = <T extends Item>({
    items,
    fields,
    onItemClick,
    titulo,
    novoRota,
    importar,
    cadastrar,
    onFileUpload,
    itemsPerPage = 8,
}: ItemListProps<T>) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [openUpload, setOpenUpload] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const renderFieldValue = (item: T, fieldValue: string) => {
        const value = getNestedValue(item, fieldValue);
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

                    {cadastrar && (
                        <>
                            <CustomButton asChild variant="outline" className="bg-cyan-900 text-white p-2 rounded w-28">
                                <Link href={novoRota ?? '/'}>Cadastrar</Link>
                            </CustomButton>

                        </>
                    )}
                    {importar && onFileUpload && (
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:auto-cols-fr lg:grid-flow-col gap-4 overflow-x-auto">
                {fields.map(({ label, value }) => (
                    <div key={value} className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        {label}
                    </div>
                ))}
            </div>

            {currentItems.map((item, index) => (
                <div
                    key={index}
                    onClick={() => {
                        setSelectedIndex(index);
                        onItemClick(item);
                    }}
                    className={`cursor-pointer border rounded-md shadow-sm p-3 transition 
                        ${selectedIndex === index
                            ? "bg-blue-100 border-blue-500 ring-2 ring-blue-500"
                            : "bg-white border-gray-300 hover:ring-2 hover:ring-blue-500"
                        }`}>
                    <div
                        className="grid gap-4 overflow-x-auto"
                        style={{ gridTemplateColumns: `repeat(${fields.length}, minmax(120px, 1fr))` }}>

                        {fields.map(({ label, value }) => (
                            <div key={value} className="text-gray-700 text-sm">
                                {renderFieldValue(item, value)}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Paginacao */}
            <div className="flex justify-between items-center mt-4">
                <CustomButton
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="bg-gray-500 text-white p-2 rounded w-28"
                >
                    Anterior
                </CustomButton>
                <span className="text-sm">
                    Página {currentPage} de {totalPages}
                </span>
                <CustomButton
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-500 text-white p-2 rounded w-28"
                >
                    Próxima
                </CustomButton>
            </div>
        </div>
    );
};
