import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Dashboard from './dashboard/page';
import { authOptions } from '@lib/auth-options';

export default async function HomePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    return (
        <Dashboard />
    );
}