'use client';

import { Usuario } from '@apimodel/payload/intefaces';
import UsuarioForm from '@components/views/usuario/usuario-form';

export default function NovoUsuario() {
    return (
        <div>
            <UsuarioForm user={{} as Usuario} />
        </div>
    );
}