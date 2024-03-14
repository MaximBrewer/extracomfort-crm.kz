
import { useLayout } from '@/Contexts/LayoutContext';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from "@inertiajs/react";
import ChevronDown from '@/Components/ChevronDown';
import genders from '@/data/genders';
import { useInView } from 'react-hook-inview';
import { Inertia } from '@inertiajs/inertia';
import { useEffect } from 'react';
import { useState } from 'react';


export default (props) => {

    const { pagetitle, patient, auth } = props

    const [appointments, setAppointments] = useState(props.appointments)
    const [books, setBooks] = useState(props.appointments)

    const loadAppointments = () => {
        Inertia.get(route('specialist.patient.card', {
            patient: patient.data.id,
            ap: 1 + appointments.meta.current_page,
            ab: books.meta.current_page,
        }), {
            only: ['appointments'],
            preserveState: true,
            preserveScroll: true,
            onSuccess: (props) => {
                setAppointments(prev => ({
                    data: [...prev.data, props.appointments.data],
                    meta: props.appointments.meta
                }))
            }
        })
    }

    // useEffect(() => {
    //     loadAppointments()
    // }, [])

    const [apRef, apInView] = useInView(
        {
            onEnter: () => {
                // if (!appointments.meta.current_page || appointments.meta.current_page < appointments.meta.last_page) loadAppointments()
            },
        },
        [],
    )

    const { priceFormat, setModal, moment } = useLayout();

    return (
        <AuthenticatedLayout
            auth={props.auth}
            scrollpage={true}
            errors={props.errors}
            heading={
                <div className={`flex space-x-4 items-center`}>
                    <h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>
                </div>
            }
        >
            <div className={`rounded-lg shadow-block bg-white px-6 py-6 mb-5 relative`}>
                <div className={`flex`}>
                    <div className={`grow border-black border-r border-opacity-50 pr-5`}>
                        <div className={`flex justify-between space-x-4 items-center`}>
                            <div className={`font-bold text-2xl text-black`}>
                                {patient.data.lastname} {patient.data.name} {patient.data.surname}
                            </div>
                        </div>
                        <hr className={`border-black my-2 border-opacity-50`} />
                        <div className={`grid grid-cols-2`}>
                            <div className={`border-black border-r border-opacity-50 pb-2`}>
                                <div className={`mr-6 border-b border-black py-1 border-opacity-50`}>
                                    <span className={`opacity-50`}>{patient.data.birthdate ? moment(patient.data.birthdate).format(`DD.MM.YYYY`) : <i>&nbsp;</i>}</span>
                                </div>
                                <div className={`mr-6 border-b border-black py-1 border-opacity-50`}>
                                    <span className={`opacity-50`}>{patient.data.email}</span>
                                </div>
                            </div>
                            <div>
                                <div className={`ml-6 border-b border-black py-1 border-opacity-50`}>
                                    <span className={`opacity-50`}>{patient.data.tin ? patient.data.tin : <i>&nbsp;</i>}</span>
                                </div>
                                <div className={`ml-6 border-b border-black py-1 border-opacity-50`}>
                                    <span className={`opacity-50`}>{patient.data.gender ? genders.data.find((item) => item.value == patient.data.gender).label : <i>&nbsp;</i>}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`shrink-0 pl-2 flex flex-col`}>
                        <div className={`opacity-50 leading-[2rem]`}>{patient.data.locality ? patient.data.locality.title : <i>&nbsp;</i>}</div>
                        <hr className={`border-black my-2 border-opacity-50`} />
                        <div className={`grow opacity-50 mt-2 py-1.5 px-2.5 break-words border rounded-lg w-[372px] border-black border-opacity-50`}>{patient.data.addon}</div>
                    </div>
                </div>
            </div>
            <div className={`rounded-lg shadow-block bg-white px-6 py-6 mb-5 grow flex flex-col`}>
                <h2 className={`text-xl font-medium mb-4`}>История</h2>
                <div className={`flex items-center justify-between mb-8`}>
                    <div className={`flex items-center space-x-[.125rem] text-violet-500`}>
                        <div className={`bg-white shadow-block flex items-center justify-center rounded-l-lg px-6 py-2`}>
                            <span>Записи на прием</span>
                        </div>
                        <div className={`bg-blue-50 flex items-center justify-center px-6 py-2`}>
                            <span>История записей</span>
                        </div>
                    </div>
                </div>
                <ul className={`grow space-y-4`}>
                    {appointments.data.map((appointment, adx) => <li key={adx} className={`rounded-lg px-6 py-6 bg-blue-50 relative`}>
                        <div className={`text-violet-500 text-sm`}>{appointment.specialist.lastname} {appointment.specialist.name} {appointment.specialist.surname}</div>
                        <hr className={`border-dashed border-blue-200 my-1`} />
                        <div className={`font-medium`}>Наименование приема</div>
                        <div className={`text-sm`}>{appointment.date} {appointment.start}</div>
                        <Link href={route('appointment', {
                            book: appointment.id
                        })} className={`absolute -translate-y-1/2 top-1/2 right-6`} >
                            <ChevronDown className={`w-4 h-auto`} />
                        </Link>
                    </li>)}
                </ul>
                {!appointments.meta.current_page || appointments.meta.current_page < appointments.meta.last_page ? <button ref={apRef}>Загрузить еще</button> : <></>}
            </div>
        </AuthenticatedLayout>
    );
}
