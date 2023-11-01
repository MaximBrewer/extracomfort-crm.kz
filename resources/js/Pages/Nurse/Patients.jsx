import ChooseBranche from '@/Components/Modals/ChooseBranche';
import PrimaryButton from '@/Components/PrimaryButton';
import { useLayout } from '@/Contexts/LayoutContext';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Paginate from '@/Layouts/Paginate';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default (props) => {

    const { pagetitle, patients } = props

    const { setModal } = useLayout();

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={
                <div className={`flex space-x-4 items-center`}>
                    <h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>
                    <Link href={route(`nurse.patient.create`)} className={`text-blue-400 underline text-xl hover:no-underline`}>Новый пациент</Link>
                </div>
            }
        >
            <Head title={pagetitle} />
            <div className={`shadow-bb rounded-lg bg-white py-5 px-6 overflow-y-auto`}>
                {patients.data.map((patient, pdx) => <Link href={route(`nurse.patient.card`, {
                    patient: patient.id
                })} key={pdx} className={`flex space-x-5 items-center mb-5 p-5 rounded-lg bg-blue-50 hover:bg-white hover:shadow-block`} preserveState>
                    <div className={`w-[20%]`}>
                        <div className={`font-medium`}>{patient.name} {patient.lastname}</div>
                        <div className={`text-sm`}>30 лет</div>
                    </div>
                    <div className={`grow`}>
                        <div className={``}>{patient.email}</div>
                    </div>
                    <div className={`shrink-0`}>
                        <div onClick={e => {
                            e.preventDefault()
                            e.stopPropagation();
                            setModal(<ChooseBranche {...props} user={patient} />)
                        }}>
                            <PrimaryButton className={`min-w-[150px] justify-center`} size={`sm`}>
                                <span>Записать</span>
                            </PrimaryButton>
                        </div>
                    </div>
                </Link>)}
            </div>
            <div className={`min-h-12`}>
                <Paginate {...patients} />
            </div>
        </AuthenticatedLayout>
    );
}
