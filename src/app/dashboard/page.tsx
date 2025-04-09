import { getUserFromSession } from '@utils/session-utils';
import HomeApp from '../home/page';

export default async function Dashboard() {
    const userSession = await getUserFromSession();

    return (
        <div>
            <HomeApp params={{ user: userSession }} />
        </div>
    )
}