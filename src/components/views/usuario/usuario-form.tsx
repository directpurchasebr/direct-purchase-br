'use client';

import { useState, useEffect } from 'react';
import { Perfil, Usuario } from '@apimodel/payload/intefaces';
import CompradorDualList from '@components/collections/comprador-dual-list';
import FornecedorDualList from '@components/collections/fornecedor-dual-list';
import { internalService } from '@services/internal-service';
import { uiStyles } from '@lib/ui-styles';
import PerfilSelector from '@components/collections/perfil-selector';

interface Props {
    user: Usuario;
}
export default function UsuarioForm({ user }: Props) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const [formData, setFormData] = useState<Usuario>({
        nome: '',
        email: '',
        login: '',
        dataNascimento: '',
        perfil: {} as Perfil,
        senha: '',
        indEstoque: false,
        fornecedores: [],
        compradores: [],
    });

    useEffect(() => {
        if (user) {
            setUsuario(user);
            setFormData({
                nome: user.nome || '',
                email: user.email || '',
                login: user.login || '',
                dataNascimento: user.dataNascimento || '',
                perfil: user.perfil || '',
                senha: user.senha || '',
                indEstoque: user.indEstoque || false,
                fornecedores: user.fornecedores || [],
                compradores: user.compradores || [],
            });
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target instanceof HTMLInputElement) {
            const { name, value, type, checked } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Dados salvos:', formData);
        // Aqui você chamaria a API para salvar
    };

    return (
        <div className="py-12 px-4 flex flex-col items-center justify-center translate-x-80">
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-4x">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={uiStyles.forms.label}>Nome</label>
                        <input name="nome" value={formData.nome} onChange={handleChange} className={uiStyles.forms.input} />
                    </div>
                    <div>
                        <label className={uiStyles.forms.label}>Email</label>
                        <input name="email" type="email" value={formData.email} onChange={handleChange} className={uiStyles.forms.input} />
                    </div>

                    <div>
                        <label className={uiStyles.forms.label}>Login</label>
                        <input name="login" value={formData.login} onChange={handleChange} className={uiStyles.forms.input} />
                    </div>
                    <div>
                        <label className={uiStyles.forms.label}>Data de Nascimento</label>
                        <input name="dataNascimento" type="date" value={formData.dataNascimento} onChange={handleChange} className={uiStyles.forms.input} />
                    </div>

                    <div>
                        <label className={uiStyles.forms.label}>Perfil</label>
                        <PerfilSelector
                            value={formData.perfil.descricao}
                            onChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    perfil: { perfilId: 0, descricao: value },
                                }))
                            }
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className={uiStyles.forms.label}>Indica Estoque</label>
                        <div className="flex items-center space-x-2">
                            <input
                                id="indicaEstoque"
                                name="indEstoque"
                                type="checkbox"
                                checked={formData.indEstoque}
                                onChange={handleChange}
                                className="w-7 h-7 accent-blue-600 border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-150"
                            />
                            <span className="text-sm">Sim</span>
                        </div>
                    </div>

                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={uiStyles.forms.label}>Fornecedores</label>
                            <FornecedorDualList
                                value={formData.fornecedores}
                                onChange={(value) => setFormData((prev) => ({ ...prev, fornecedores: value }))}
                            />
                        </div>
                        <div>
                            <label className={uiStyles.forms.label}>Compradores</label>
                            <CompradorDualList
                                value={formData.compradores}
                                onChange={(value) => setFormData((prev) => ({ ...prev, compradores: value }))}
                            />
                        </div>
                    </div>

                    {formData.perfil.descricao === 'ADMIN' && (
                        <div className="col-span-2">
                            <label className={uiStyles.forms.label}>Senha Inicial</label>
                            <input
                                type="password"
                                name="senha"
                                value={formData.senha}
                                onChange={handleChange}
                                className={uiStyles.forms.input}
                            />
                        </div>
                    )}
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300 text-base font-semibold"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
