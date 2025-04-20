import { getUserFromSession } from '@utils/session-utils';
import HomeApp from '../home/page';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    const userSession = await getUserFromSession();

    if (!session) {
        redirect('/login');
    }
    return (
        <div>
            <HomeApp params={{ user: userSession }} />
        </div>
    )
}