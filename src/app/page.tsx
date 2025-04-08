import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import Dashboard from './dashboard/page';

export default async function HomePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    return (
        <Dashboard />
        // <div className="p-6">
        //     <h1 className="text-2xl font-bold mb-4">Bem-vindo ao sistema!</h1>
        //     <p className="text-gray-700">Você está logado.</p>
        // </div>
    );
}