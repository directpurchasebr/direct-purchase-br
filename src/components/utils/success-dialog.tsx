"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface SuccessDialogProps {
    message: string;
}

export function SuccessDialog({ message }: SuccessDialogProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-72 p-6 bg-white rounded-lg shadow-md transform -translate-x-1/2 -translate-y-1/2">

                    <Dialog.Title asChild>
                        <VisuallyHidden>Status</VisuallyHidden>
                    </Dialog.Title>

                    <div className="text-center">
                        <p className="text-lg font-semibold mb-4">
                            {message}
                        </p>
                        <button
                            onClick={() => setOpen(false)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            OK
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

