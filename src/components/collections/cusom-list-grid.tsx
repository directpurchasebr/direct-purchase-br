"use client";

import React, { FC } from "react";

type Item = { [key: string]: any };

interface ItemListProps {
    items: Item[];
    fields: string[];
    onItemClick?: (item: Item) => void;
}

export const CustomListGrid: FC<ItemListProps> = ({ items, fields, onItemClick }) => {
    return (
        <div className="space-y-3">
            {/* Cabeçalho com os nomes dos campos */}
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-1">
                {fields.map((field) => (
                    <div key={field} className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                        {field}
                    </div>
                ))}
            </div>

            {/* Lista de itens */}
            {items.map((item, index) => (
                <div
                    key={index}
                    onClick={() => onItemClick?.(item)}
                    className="cursor-pointer bg-white border border-gray-300 rounded-md shadow-sm p-3 hover:ring-2 hover:ring-blue-500 transition focus:outline-none"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {fields.map((field) => (
                            <div key={field} className="text-gray-700 text-sm">
                                {item[field]}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
