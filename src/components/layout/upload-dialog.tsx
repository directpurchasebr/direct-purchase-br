'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadSimple, X, FileText } from '@phosphor-icons/react'

interface UploadDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onFileUpload: (file: File) => void // <-- novo!
}

export function UploadDialog({ open, onOpenChange, onFileUpload }: UploadDialogProps) {
    const [file, setFile] = useState<File | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0])
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        },
        multiple: false,
    })

    const handleUpload = () => {
        if (!file) return
        onFileUpload(file)
        onOpenChange(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40" />
                <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <Dialog.Title className="text-lg font-medium">
                            Enviar Arquivo
                        </Dialog.Title>
                        <Dialog.Close asChild>
                            <button onClick={() => onOpenChange(false)}>
                                <X size={20} weight="bold" />
                            </button>
                        </Dialog.Close>
                    </div>

                    <div
                        {...getRootProps()}
                        className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center cursor-pointer hover:bg-gray-50"
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Solte o arquivo aqui...</p>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <UploadSimple size={32} weight="duotone" className="text-gray-500" />
                                <p>Arraste e solte um arquivo ou clique para selecionar</p>
                                <p className="text-xs text-muted-foreground">.pdf, .xls, .xlsx</p>
                            </div>
                        )}
                    </div>

                    {file && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
                            <FileText size={16} />
                            {file.name}
                        </div>
                    )}

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleUpload}
                            disabled={!file}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                        >
                            Enviar
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
