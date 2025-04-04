"use client";

import Navbar from '@/components/layout/navbar';
import Container from '@/components/layout/container';
import Home from '../home/page';

const Dashboard: React.FC = (dynamicComponent) => {
 
    return (
        <div>
            <Navbar />
            <Container customClass="min-height">
                <Home  />
            </Container>
        </div>
    )
}

export default Dashboard;