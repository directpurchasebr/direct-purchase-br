import { authOptions } from "@lib/auth-options";
import { getServerSession } from "next-auth";

export default async function ContatoPage() {
    const session = await getServerSession(authOptions);

    return (
        <div className="max-w-full mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold mb-6">Entre em Contato</h1>

            <form className="space-y-6 w-[500px]">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nome
                    </label>
                    <input
                        type="text"
                        name="problema"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Problema"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Mensagem
                    </label>
                    <textarea
                        name="mensagem"
                        rows={7}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Escreva sua mensagem aqui..."
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Enviar
                </button>
            </form>
        </div>
    );
}
