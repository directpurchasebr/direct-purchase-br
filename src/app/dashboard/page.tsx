import Navbar from '@/components-ui/layout/navbar';
import Container from '@/components-ui/layout/container';
import Home from '../home/page';
import { getUserFromSession } from '@lib/user-session';
import { getServerSession } from 'next-auth';

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