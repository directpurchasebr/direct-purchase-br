import { useState } from "react";
import { Pessoa } from "@apimodel/payload/intefaces";
import React, { FC } from "react";
import { CustomButton } from "@components/layout/custom-button";
import Link from "next/link";
import { UploadDialog } from "@components/layout/upload-dialog";

type Item = { [key: string]: any };

interface ItemListProps {
    items: Item[];
    fields: { label: string; value: string }[];
    onItemClick: (item: Pessoa) => void;
    titulo: string;
    novoRota?: string;
    importar?: string;
    onFileUpload?: (file: File) => void;
}

export const CustomListGrid: FC<ItemListProps> = ({ items, fields, onItemClick, titulo, novoRota, importar, onFileUpload }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [openUpload, setOpenUpload] = useState(false);

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{titulo}</h2>
                <div className="space-x-2">
                    <CustomButton asChild variant="outline" className="bg-cyan-900 text-white p-2 rounded w-28">
                        <Link href={novoRota ?? '/'}>Cadastrar</Link>
                    </CustomButton>
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

            {items.map((item, index) => (
                <div
                    key={index}
                    onClick={() => {
                        setSelectedIndex(index);
                        onItemClick(item as Pessoa);
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
                                {item[value]}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
