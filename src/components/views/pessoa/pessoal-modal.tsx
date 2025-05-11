'use client';

import { ReactNode, useState } from 'react';
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Pessoa } from '@apimodel/payload/intefaces';
import PessoaForm from './pessoa-form';

type Props = {
    trigger: ReactNode;
    initialData?: Pessoa;
    onSave: (pessoa: Pessoa) => void;
};

export default function PessoaModal({ trigger, initialData, onSave }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogOverlay className="fixed inset-0 bg-black/30 z-40" />
            <DialogContent className="fixed z-50 top-1/2 left-1/2 
                    w-[90vw] max-w-5xl min-w-[800px]
                    max-h-[90vh] min-h-[400px]
                    -translate-x-1/2 -translate-y-1/2
                     bg-white rounded-xl p-6 shadow-lg overflow-auto">
                <VisuallyHidden>
                    <DialogTitle>Pessoa Modal</DialogTitle>
                </VisuallyHidden>
                <PessoaForm
                    onSave={(pessoa: Pessoa) => onSave(pessoa)}
                    initialData={initialData}
                    onClose={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
