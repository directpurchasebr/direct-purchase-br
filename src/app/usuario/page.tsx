'use client';

import { Usuario } from '@apimodel/payload/intefaces';
import UsuarioForm from '@components/views/usuario/usuario-form';
import { internalService } from '@services/internal-service';
import { useEffect, useState } from 'react';

export default function EditUsuario() {
    const [usuario, setUsuario] = useState<Usuario>();
    useEffect(() => {
        internalService.usuario.get().then((res) => {
            if (res) {
                setUsuario(res);
            }
        });
    }, []);

    return (
        <div>
            {usuario && <UsuarioForm user={usuario} />}
        </div>
    );
}