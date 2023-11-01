import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';


export default (props) => {

    const { pagetitle, specialists, week, directions } = props

    const [tab, setTab] = useState(`specialists`)

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
        >
            <Head title={pagetitle} />

            <div className="pb-12 overflow-hidden flex flex-col">
                <div className={`shadow-bb rounded-lg bg-white py-5 px-6 overflow-y-auto`}>
                    {specialists.map((specialist, sdx) => <div key={sdx} className={`flex space-x-5 items-center mb-5 p-5 rounded-lg bg-blue-50 hover:bg-white hover:shadow-block`}>
                        <div className={`shrink-0 w-10 h-10 bg-cover rounded bg-center`} style={{ backgroundImage: `url('${specialist.avatar}')` }}></div>
                        <div className={`grow`}>
                            <div className={`font-medium text-violet-500`}>{specialist.lastname} {specialist.name} {specialist.surname}</div>
                            <ul className={`text-sm flex space-x-3`}>
                                {specialist.directions.map((dir, ddx) => <li key={ddx}>{dir.title}</li>)}
                            </ul>
                        </div>
                        <div>
                            <Link href={route('recieption.specialist.schedule', {
                                specialist: specialist.id
                            })} className={`text-violet-500`}>
                                <PrimaryButton className={`min-w-[150px] justify-center`} size={`sm`}>
                                    <span>Расписание</span>
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>)}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
