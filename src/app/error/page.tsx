'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Props {
    internalError: string;
}


export default function ErrorPage({ internalError }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code') || internalError ||'500';

  useEffect(() => {
    console.error(`Erro ${code} detectado`);
  }, [code]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center translate-x-80">
      <h1 className="text-6xl font-bold text-red-600 mb-2">Erro {code}</h1>
      <p className="text-xl text-gray-700 mb-4">Algo deu errado. Mas um doguinho está a caminho 🐶</p>
      <Image
        src={`https://http.dog/${code}.jpg`}
        alt={`Erro ${code}`}
        width={600}
        height={400}
        className="rounded-xl shadow-lg"
      />
      <button
        className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
        onClick={() => router.push('/')}
      >
        Voltar para o início
      </button>
    </div>
  );
}
