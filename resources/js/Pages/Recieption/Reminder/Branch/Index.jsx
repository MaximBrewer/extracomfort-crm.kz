import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useLayout } from '@/Contexts/LayoutContext';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Reminder from '@/Components/Modals/Reminder';
import { useState } from 'react';


export default (props) => {

    const { specialists } = props

    const { setModal } = useLayout();

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={false}
        >
            <div className="pb-12 overflow-hidden flex flex-col">
                <div className={`shadow-bb rounded-lg bg-white py-5 px-6 overflow-y-auto`}>
                    {specialists.data.map((specialist, sdx) => <div key={sdx} className={`flex space-x-5 items-center mb-5 p-5 rounded-lg bg-blue-50 hover:bg-white hover:shadow-block`}>
                        <div className={`shrink-0 w-10 h-10 bg-cover rounded bg-center`} style={{ backgroundImage: `url('${specialist.avatar}')` }}></div>
                        <div className={`grow`}>
                            <div className={`font-medium text-violet-500`}>{specialist.lastname} {specialist.name} {specialist.surname}</div>
                            <ul className={`text-sm flex space-x-3`}>
                                {specialist.directions.map((dir, ddx) => <li key={ddx}>{dir.title}</li>)}
                            </ul>
                        </div>
                        <div>
                            <SecondaryButton onClick={e => setModal(<Reminder
                                {...props}
                                specialist={specialist}
                            />)} className={`min-w-[90px] justify-center`} size={`xs`}>
                                <span>Бронь</span>
                            </SecondaryButton>
                        </div>
                    </div>)}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
