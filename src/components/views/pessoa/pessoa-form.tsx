import { Pessoa, PessoaBanco, PessoaEndereco } from '@apimodel/payload/intefaces';
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
};

export default function PessoaForm({ initialData, onClose }: PessoaFormProps) {
    const [form, setForm] = useState<Pessoa>(initialData ?? initialPessoa);

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
        console.log('Enviando pessoa:', form);
        onClose?.();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Dados principais */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    'codigo',
                    'nome',
                    'nomeFantasia',
                    'cpf',
                    'cnpj',
                    'inscricaoEstadual',
                    'inscricaoMunicipal',
                    'telefone',
                    'email',
                    'site',
                    'responsavel',
                    'telefoneResponsavel',
                    'observacoes',
                ].map((field) => (
                    <div key={field}>
                        <label className={labelClass}>{field}</label>
                        <input
                            name={field}
                            value={(form as any)[field] ?? ""}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>
                ))}
            </div>

            {/* Endereços */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Endereços</h3>
                    <button
                        type="button"
                        onClick={addEndereco}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        + Adicionar Endereço
                    </button>
                </div>

                {form.enderecos.map((endereco, idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-4 mb-4">
                        {Object.keys(endereco).map((key) => (
                            <div key={key}>
                                <label className={labelClass}>{key}</label>
                                <input
                                    value={(endereco as any)[key]}
                                    onChange={(e) => handleEnderecoChange(idx, key as keyof PessoaEndereco, e.target.value)}
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
                    <button
                        type="button"
                        onClick={addBanco}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        + Adicionar Banco
                    </button>
                </div>

                {form.bancos.map((banco, idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-4 mb-4">
                        {Object.keys(banco).map((key) => (
                            <div key={key}>
                                <label className={labelClass}>{key}</label>
                                <input
                                    value={(banco as any)[key]}
                                    onChange={(e) => handleBancoChange(idx, key as keyof PessoaBanco, e.target.value)}
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
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow"
                >
                    Salvar
                </button>
            </div>
        </form>
    );
}
