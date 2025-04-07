import Navbar from '@components/layout/navbar';
import Container from '@components/layout/container';
import Home from '../home/page';
import { getUserFromSession } from '@lib/user-session';

export default async function Dashboard() {
    const userSession = await getUserFromSession();

    return (
        <div>
            <Navbar />
            <Container customClass="min-height">
                <Home params={{ user: userSession }} />
            </Container>
        </div>
    )
}