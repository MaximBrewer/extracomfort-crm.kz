import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome(props) {

    const { pagetitle = `` } = props

    return (
        <>
            <Head title={pagetitle} />
            <div className="relative min-h-screen bg-center">
                <div className="p-6 text-right">
                    {props.auth.user ? (
                        <Link
                            href={route('client.timetable')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Кабинет
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Вход
                            </Link>
                        </>
                    )}
                </div>

                <div className={`mb-4 flex flex-col items-center pt-32`}>
                    <ApplicationLogo className="w-32 h-auto" />
                </div>
            </div>
        </>
    );
}
