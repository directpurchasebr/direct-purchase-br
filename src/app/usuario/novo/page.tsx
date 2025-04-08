'use client';

import { Usuario } from '@apimodel/payload/intefaces';
import UsuarioForm from '@components/views/usuario/usuario-form';
import { internalService } from '@services/internal-service';
import { useEffect, useState } from 'react';

export default function NovoUsuario() {
    return (
        <div>
            <UsuarioForm user={{} as Usuario} />
        </div>
    );
}