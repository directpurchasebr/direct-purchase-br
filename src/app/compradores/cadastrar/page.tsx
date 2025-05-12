"use client";

import { Comprador, Fornecedor, Pessoa, Status } from "@apimodel/payload/intefaces";
import PessoaForm from "@components/views/pessoa/pessoa-form";
import { internalService } from "@services/internal-service";
import { useState } from "react";
import { toast } from "sonner";

export default function CadastrarFornecedor() {
    const [status, setStatus] = useState<Status | null>(null);

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

    return (
        <div className="py-12 px-4 flex flex-col items-center justify-center translate-x-44">
            <PessoaForm
                onSave={(pessoa) => {
                    const comprador: Comprador = {
                        compradorId: 0,
                        pessoaId: pessoa.pessoaId,
                        negocioId: pessoa.negocioId,
                        codigo: pessoa.codigo,
                        nome: pessoa.nome,
                        nomeFantasia: pessoa.nomeFantasia,
                        cpf: pessoa.cpf,
                        cnpj: pessoa.cnpj,
                        inscricaoEstadual: pessoa.inscricaoEstadual,
                        inscricaoMunicipal: pessoa.inscricaoMunicipal,
                        telefone: pessoa.telefone,
                        email: pessoa.email,
                        site: pessoa.site,
                        responsavel: pessoa.responsavel,
                        telefoneResponsavel: pessoa.telefoneResponsavel,
                        observacoes: pessoa.observacoes,
                        enderecos: pessoa.enderecos,
                        bancos: pessoa.bancos,
                    };

                    internalService.comprador.salvar(comprador).then((res) => {
                        if (res) {
                            setStatus(res);
                            toast.success(res.mensagem);
                        }
                    });

                }}
                initialData={initialPessoa}
            />
        </div>
    )
}