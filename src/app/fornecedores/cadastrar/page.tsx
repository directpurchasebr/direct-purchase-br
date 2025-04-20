import { Fornecedor } from "@apimodel/payload/intefaces";
import PessoaForm from "@components/views/pessoa/pessoa-form";

export default function CadastrarFornecedor() {
    return (
        <PessoaForm initialData={{} as Fornecedor} />
    )
}