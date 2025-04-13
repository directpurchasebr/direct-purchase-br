'use client';

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { internalService } from "@services/internal-service";
import { Produto } from "@apimodel/payload/intefaces";

interface Props {
    value: string;
    onSelect: (produto: any) => void;
    className: string;
    classNameInput: string;
}

export default function InputSearchProduto({ value, onSelect, className, classNameInput }: Props) {

    const [inputValue, setInputValue] = useState(value ?? "");
    const [resultados, setResultados] = useState<Produto[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(0);

    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        setInputValue(value ?? "");
    }, [value]);

    useEffect(() => {
        if (itemRefs.current[highlightIndex]) {
            itemRefs.current[highlightIndex]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [highlightIndex]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (showDropdown && resultados.length > 0) {
                const selecionado = resultados[highlightIndex];
                onSelect(selecionado);
                setShowDropdown(false);
                return;
            }

            internalService.produto.buscar(inputValue).then((res) => {
                if (res) {
                    setResultados(res);
                    setHighlightIndex(0);
                    setShowDropdown(true);
                }
            });
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightIndex((prev) => Math.min(prev + 1, resultados.length - 1));
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightIndex((prev) => Math.max(prev - 1, 0));
        }

        if (e.key === "Escape") {
            setShowDropdown(false);
        }
    };

    return (
        <div className={className} style={{ position: "relative" }}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className={classNameInput}
            />
            {showDropdown && resultados.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-40 overflow-y-auto">
                    {resultados.map((produto, index) => (
                        <li
                            key={index}
                            ref={(el) => { itemRefs.current[index] = el }}
                            className={`px-2 py-1 cursor-pointer text-black ${index === highlightIndex ? 'bg-blue-200' : 'hover:bg-blue-100'
                                }`}
                            onMouseEnter={() => setHighlightIndex(index)}
                            onClick={() => {
                                onSelect(produto);
                                setInputValue(produto.descricao);
                                setShowDropdown(false);
                            }}>
                            {produto.descricao}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
