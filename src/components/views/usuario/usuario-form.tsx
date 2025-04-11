'use client';

import { Comprador, Fornecedor, Perfil, Status, Usuario } from '@apimodel/payload/intefaces';
import CustomDualList from '@components/collections/custom-dual-list';
import CustomSelector from '@components/collections/custom-selector';
import { uiStyles } from '@lib/ui-styles';
import { internalService } from '@services/internal-service';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface Props {
    user: Usuario;
}

export default function UsuarioForm({ user }: Props) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [status, setStatus] = useState<Status | null>(null);
    const [perfil, setPerfil] = useState<Array<Perfil>>([]);
    const [compradores, setCompradores] = useState<Array<Comprador>>([]);
    const [fornecedores, setFornecedores] = useState<Array<Fornecedor>>([]);

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
        internalService.perfil.listar().then((res) => res && setPerfil(res));
        internalService.comprador.listar().then((res) => res && setCompradores(res));
        internalService.fornecedor.listar().then((res) => res && setFornecedores(res));

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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target instanceof HTMLInputElement) {
            const { name, value, type, checked } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        internalService.usuario.salvar(formData).then((res) => res && setStatus(res));
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

                        <CustomSelector<Perfil>
                            value={formData.perfil}
                            onChange={(value) => setFormData((prev) => ({ ...prev, perfil: value }))}
                            list={perfil}
                            getLabel={(p) => p.descricao}
                            getKey={(p) => p.perfilId}
                            initText="Selecione um perfil"
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
                            <CustomDualList<Fornecedor>
                                value={formData.fornecedores}
                                onChange={(value) => setFormData((prev) => ({ ...prev, fornecedores: value }))}
                                list={fornecedores}
                                getKey={(f) => f.fornecedorId}
                                getLabel={(f) => f.nome}
                            />

                        </div>
                        <div>
                            <label className={uiStyles.forms.label}>Compradores</label>
                            <CustomDualList<Comprador>
                                value={formData.compradores}
                                onChange={(value) => setFormData((prev) => ({ ...prev, compradores: value }))}
                                list={compradores}
                                getKey={(c) => c.compradorId}
                                getLabel={(c) => c.nome}
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

                {status && (
                    <div
                        className={`mt-4 p-4 rounded-lg text-sm font-semibold ${status.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                    >
                        {status.mensagem}
                    </div>
                )}
            </form>
        </div>
    );
}
