"use client";

import { Fornecedor, Produto, Status } from "@apimodel/payload/intefaces";
import { useState } from "react";
import { CustomButton } from "@components/utils/custom-button";
import { internalService } from "@services/internal-service";
import { toast } from "sonner";

const inputClass =
    'w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700';
const labelClass = 'block mb-1 text-sm font-medium text-gray-700';

const initialProduto: Produto = {
    produtoId: 0,
    descOriginal: '',
    codigo: '',
    descricao: '',
    marca: '',
    unidade: '',
    preco: 0,
    fornecedor: {} as Fornecedor,
};

type ProdutoFormProps = {
    initialData?: Produto;
    onClose?: () => void;
};

export default function ProdutoForm({ initialData, onClose }: ProdutoFormProps) {
    const [form, setForm] = useState<Produto>(initialData ?? initialProduto);
    const [status, setStatus] = useState<Status | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === "preco" ? parseFloat(value) : value,
        });
    };

    const handleFornecedorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            fornecedor: {
                ...form.fornecedor,
                nome: e.target.value,
            },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        internalService.produto.salvar(form).then((res) => {
            if (res) {
                setStatus(res);
                toast.success(status.mensagem);
            }
        });

        onClose?.();
    };

    return (
        <div className="p-2">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className={labelClass}>Código</label>
                        <input disabled name="codigo" value={form.codigo} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Descrição</label>
                        <input name="descricao" value={form.descOriginal} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Marca</label>
                        <input name="marca" value={form.marca ?? ""} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Unidade</label>
                        <input name="unidade" value={form.unidade} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Preço</label>
                        <input name="preco" type="number" step="0.01" value={form.preco} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Fornecedor</label>
                        <input disabled name="fornecedor.nome" value={form.fornecedor?.nome} onChange={handleFornecedorChange} className={inputClass} />
                    </div>
                </div>

                <div className="flex justify-end">
                    <CustomButton type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-40">
                        Salvar
                    </CustomButton>
                </div>

            </form>
        </div>
    );
}
