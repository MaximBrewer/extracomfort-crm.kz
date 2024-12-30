import DefaultButton from '@/Components/DefaultButton';
import ChooseBranche from '@/Components/Modals/ChooseBranche';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useLayout } from '@/Contexts/LayoutContext';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Paginate from '@/Layouts/Paginate';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default (props) => {

    const { auth, pagetitle, patients, request = {} } = props

    const { setModal, age } = useLayout();

    const { data, setData, get } = useForm(request);

    const handleOnChange = (e) => setData(e.target.name, e.target.value);

    const submit = (e) => {
        e.preventDefault()
        get(route(`${auth.user.role.name}.patients`))
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={
                <div className={`flex space-x-4 items-center`}>
                    <h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>
                    <Link href={route(`${auth.user.role.name}.patient.create`)} className={`text-blue-400 underline text-xl hover:no-underline`}>Новый пациент</Link>
                </div>
            }
        >
            <form onSubmit={submit} className="flex gap-4 items-center mb-4 p-1">
                <div className="grow">
                    <TextInput name="q" value={data.q ?? ``} className="w-full" onChange={handleOnChange} />
                </div>
                <div>
                    <PrimaryButton className="" size={`sm`}>Найти</PrimaryButton>
                </div>
            </form>
            <div className={`shadow-bb rounded-lg bg-white py-5 px-6 overflow-y-auto`}>
                {patients.data.map((patient, pdx) => <Link href={route(`${auth.user.role.name}.patient.card`, {
                    patient: patient.id
                })} key={pdx} className={`flex space-x-3 items-center mb-5 p-5 rounded-lg bg-blue-50 hover:bg-white hover:shadow-block`} preserveState>
                    <div className={`w-[70%]`}>
                        <div className={`font-medium`}>{patient.fullName}</div>
                        <div className={`text-sm`}>{age(patient)}</div>
                    </div>
                    <div className={`grow`}>
                        <div className={``}>{patient.email}</div>
                    </div>
                    <div className={`shrink-0`}>
                        <div onClick={e => {
                            e.preventDefault()
                            e.stopPropagation();
                            setModal(<ChooseBranche {...props} user={patient} component={`book`} />)
                        }}>
                            <PrimaryButton className={`min-w-[90px] justify-center`} size={`xs`}>
                                <span>Записать</span>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className={`shrink-0`}>
                        <div onClick={e => {
                            e.preventDefault()
                            e.stopPropagation();
                            setModal(<ChooseBranche {...props} user={patient} component={`reminder`} />)
                        }}>
                            <SecondaryButton className={`min-w-[90px] justify-center`} size={`xs`}>
                                <span>Бронь</span>
                            </SecondaryButton>
                        </div>
                    </div>
                </Link>)}
            </div>
            <div className={`min-h-12`}>
                <Paginate {...patients.meta} />
            </div>
        </AuthenticatedLayout>
    );
}
