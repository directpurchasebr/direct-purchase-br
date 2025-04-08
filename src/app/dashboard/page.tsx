import { getUserFromSession } from '@lib/user-session';
import HomeApp from '../home/page';

export default async function Dashboard() {
    const userSession = await getUserFromSession();

    return (
        <div>
            <HomeApp params={{ user: userSession }} />
        </div>
    )
}