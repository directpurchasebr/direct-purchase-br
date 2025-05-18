import { getUserFromSession } from '@utils/session-utils';
import HomeApp from '../../components/views/home/page';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@lib/auth-options';

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    const userSession = await getUserFromSession();

    if (!session) {
        redirect('/login');
    }
    return (
        <div>
            <HomeApp userName={userSession.name} accessToken={userSession.accessToken} />
        </div>
    )
}