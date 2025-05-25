"use client";

import { Pessoa, PessoaBanco, PessoaEndereco } from '@apimodel/payload/intefaces';
import { CustomButton } from '@components/utils/custom-button';
import { useState } from 'react';

const inputClass =
    'w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700';
const labelClass = 'block mb-1 text-sm font-medium text-gray-700';

const initialPessoa: Pessoa = {
    pessoaId: 0,
    negocioId: 0,
    codigo: '',
    nome: '',
    nomeFantasia: '',
    cpf: '',
    cnpj: '',
    inscricaoEstadual: '',
    inscricaoMunicipal: '',
    telefone: '',
    email: '',
    site: '',
    responsavel: '',
    telefoneResponsavel: '',
    observacoes: '',
    enderecos: [],
    bancos: [],
};

type PessoaFormProps = {
    initialData?: Pessoa;
    onClose?: () => void;
    onSave: (pessoa: Pessoa) => void;
};

export default function PessoaForm({ initialData, onClose, onSave }: PessoaFormProps) {
    const [form, setForm] = useState<Pessoa>(initialData ?? initialPessoa);

    const fields = [
        { label: 'Código', value: 'codigo' },
        { label: 'Nome', value: 'nome' },
        { label: 'Nome Fantasia', value: 'nomeFantasia' },
        { label: 'CPF', value: 'cpf' },
        { label: 'CNPJ', value: 'cnpj' },
        { label: 'Inscrição Estadual', value: 'inscricaoEstadual' },
        { label: 'Inscrição Municipal', value: 'inscricaoMunicipal' },
        { label: 'Telefone', value: 'telefone' },
        { label: 'E-mail', value: 'email' },
        { label: 'Site', value: 'site' },
        { label: 'Responsável', value: 'responsavel' },
        { label: 'Telefone do Responsável', value: 'telefoneResponsavel' },
        { label: 'Observações', value: 'observacoes' },
    ];

    const enderecoFields = [
        { label: 'Logradouro', value: 'logradouro' },
        { label: 'Número', value: 'numero' },
        { label: 'Complemento', value: 'complemento' },
        { label: 'Bairro', value: 'bairro' },
        { label: 'Cidade', value: 'cidade' },
        { label: 'Estado', value: 'estado' },
        { label: 'CEP', value: 'cep' },
    ];

    const bancoFields = [
        { label: 'Banco', value: 'banco' },
        { label: 'Agência', value: 'agencia' },
        { label: 'Conta', value: 'conta' },
        { label: 'Tipo de Conta', value: 'tipoConta' },
        { label: 'Titular', value: 'titular' },
        { label: 'CNPJ do Titular', value: 'cnpjTitular' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleEnderecoChange = (index: number, field: keyof PessoaEndereco, value: string) => {
        const updated = [...form.enderecos];
        updated[index] = { ...updated[index], [field]: value };
        setForm({ ...form, enderecos: updated });
    };

    const handleBancoChange = (index: number, field: keyof PessoaBanco, value: string) => {
        const updated = [...form.bancos];
        updated[index] = { ...updated[index], [field]: value };
        setForm({ ...form, bancos: updated });
    };

    const addEndereco = () => {
        setForm({
            ...form,
            enderecos: [...form.enderecos, { pessoaEnderecoId: 0, logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', cep: '' }],
        });
    };

    const addBanco = () => {
        setForm({
            ...form,
            bancos: [...form.bancos, { pessoaBancoId: 0, banco: '', agencia: '', conta: '', tipoConta: '', titular: '', cnpjTitular: '' }],
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
        onClose?.();
    };

    return (
        <div className="p-2">
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Dados principais */}
                <div className="grid grid-cols-4 gap-4">
                    {fields.map(({ label, value }) => (
                        <div key={value}>
                            <label className={labelClass}>{label}</label>
                            <input
                                name={value}
                                value={(form as any)[value] ?? ""}
                                onChange={handleChange}
                                className={inputClass + ' uppercase'}
                            />
                        </div>
                    ))}
                </div>

                {/* Endereços */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">Endereços</h3>
                        <CustomButton type="button"
                            variant="outline"
                            onClick={addEndereco}
                            className="bg-stone-600 text-white p-2 rounded w-40">
                            + Adicionar Endereço
                        </CustomButton>
                    </div>

                    {(form.enderecos || []).map((endereco, idx) => (
                        <div key={idx} className="grid grid-cols-4 gap-4 mb-4">
                            {enderecoFields.map(({ label, value }) => (
                                <div key={value}>
                                    <label className={labelClass}>{label}</label>
                                    <input
                                        name={value}
                                        value={(endereco as any)[value]}
                                        onChange={(e) => handleEnderecoChange(idx, value as keyof PessoaEndereco, e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Bancos */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">Contas Bancárias</h3>
                        <CustomButton type="button"
                            variant="outline"
                            onClick={addBanco}
                            className="bg-stone-600 text-white p-2 rounded w-40">
                            + Adicionar Banco
                        </CustomButton>

                    </div>

                    {(form.bancos || []).map((banco, idx) => (
                        <div key={idx} className="grid grid-cols-4 gap-4 mb-4">
                            {bancoFields.map(({ label, value }) => (
                                <div key={value}>
                                    <label className={labelClass}>{label}</label>
                                    <input
                                        name={value}
                                        value={(banco as any)[value]}
                                        onChange={(e) => handleBancoChange(idx, value as keyof PessoaBanco, e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow w-40"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
