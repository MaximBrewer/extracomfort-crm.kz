import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center pt-32">
            <div className={`mb-4`}>
                <Link href="/">
                    <ApplicationLogo className="w-32 h-auto" />
                </Link>
            </div>

            <div className="w-full max-w-md px-6 py-6 bg-white overflow-hidden shadow-[0px_1px_8px_rgba(0,0,0,.1)] rounded-xl">
                {children}
            </div>
        </div>
    );
}
