import '../globals.css';
import { ReactNode } from 'react';

export const metadata = {
    title: 'Login | EasyMerge',
};

export default function LoginLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}
