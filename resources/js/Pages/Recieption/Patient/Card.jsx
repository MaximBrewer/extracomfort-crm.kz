
import { useLayout } from '@/Contexts/LayoutContext';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import PrimaryButton from '@/Components/PrimaryButton';
import SuccessButton from '@/Components/SuccessButton';
import CancelButton from "@/Components/CancelButton";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError"
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput"
import Select from 'react-select';
import Pencil from '@/Components/Pencil';
import ChevronDown from '@/Components/ChevronDown';
import ChevronRight from '@/Components/ChevronRight';
import ChevronLeft from '@/Components/ChevronLeft';
import TopUp from '@/Components/Modals/TopUp';
import Plus from '@/Components/Plus';
import ChooseBranche from '@/Components/Modals/ChooseBranche';


export default (props) => {

    const { pagetitle, patient, auth, genders } = props

    const { priceFormat, setModal, moment } = useLayout();

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={
                <div className={`flex space-x-4 items-center`}>
                    <h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>
                    <a
                        href={`#`}
                        onClick={e => {
                            e.preventDefault()
                            setModal(<ChooseBranche {...props} user={patient} />)
                        }}
                        className={`text-blue-400 underline text-xl hover:no-underline`}>Записать на прием</a>
                </div>
            }
        >
            <div className={`rounded-lg shadow-block bg-white px-6 py-6 mb-5 relative`}>
                <Link
                    className={`absolute right-0 top-0 text-white bg-blue-400 w-6 h-6 flex items-center justify-center rounded-tr-lg`}
                    href={route(`recieption.patient.edit`, {
                        patient: patient.id
                    })}>
                    <Pencil className={`w-4 h-4`} />
                </Link>

                <div className={`flex`}>
                    <div className={`grow border-black border-r border-opacity-50 pr-5`}>
                        <div className={`flex justify-between space-x-4 items-center`}>
                            <div className={`font-bold text-2xl text-black`}>
                                {patient.lastname} {patient.name} {patient.surname}
                            </div>
                            <div className={`flex items-center space-x-2`}>
                                <span>Баланс: <span className={`text-blue-400`}>{priceFormat(patient.balance)}</span></span>
                                <a href={`#`} onClick={e => {
                                    e.preventDefault();
                                    setModal(<TopUp {...props} user={patient} />)
                                }} className={`w-[1.0625rem] h-[1.0625rem] rounded bg-violet-500 flex items-center justify-center text-white`}>
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.7915 4.79199V0.541992H6.20817V4.79199H10.4582V6.20866H6.20817V10.4587H4.7915V6.20866H0.541504V4.79199H4.7915Z" fill="currentColor" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <hr className={`border-black my-2 border-opacity-50`} />
                        <div className={`grid grid-cols-2`}>
                            <div className={`border-black border-r border-opacity-50 pb-2`}>
                                <div className={`mr-6 border-b border-black py-1 border-opacity-50`}>
                                    <span className={`opacity-50`}>{patient.birthdate ? moment(patient.birthdate).format(`DD.MM.YYYY`) : <i>&nbsp;</i>}</span>
                                </div>
                                <div className={`mr-6 border-b border-black py-1 border-opacity-50`}>
                                    <span className={`opacity-50`}>{patient.email}</span>
                                </div>
                            </div>
                            <div>
                                <div className={`ml-6 border-b border-black py-1 border-opacity-50`}>
                                    <span className={`opacity-50`}>{patient.tin ? patient.tin : <i>&nbsp;</i>}</span>
                                </div>
                                <div className={`ml-6 border-b border-black py-1 border-opacity-50`}>
                                    <span className={`opacity-50`}>{patient.gender ? genders.find((item) => item.value == patient.gender).label : <i>&nbsp;</i>}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`shrink-0 pl-2 flex flex-col`}>
                        <div className={`opacity-50 leading-[2rem]`}>{patient.locality ? patient.locality.title : <i>&nbsp;</i>}</div>
                        <hr className={`border-black my-2 border-opacity-50`} />
                        <div className={`grow opacity-50 mt-2 py-1.5 px-2.5 break-words border rounded-lg w-[372px] border-black border-opacity-50`}>{patient.addon}</div>
                    </div>
                </div>
            </div>
            <div className={`rounded-lg shadow-block bg-white px-6 py-6 mb-5 grow flex flex-col overflow-y-hidden`}>
                <h2 className={`text-xl font-medium mb-4`}>История</h2>
                <div className={`flex items-center justify-between`}>
                    <div className={`flex items-center space-x-[.125rem] text-violet-500`}>
                        <div className={`bg-white shadow-block w-24 h-10 flex items-center justify-center rounded-l-lg`}>
                            <span>Неделя</span>
                        </div>
                        <div className={`bg-blue-50 w-24 h-10 flex items-center justify-center`}>
                            <span>Месяц</span>
                        </div>
                        <div className={`bg-blue-50 w-24 h-10 flex items-center justify-center rounded-r-lg`}>
                            <span>Год</span>
                        </div>
                    </div>
                    <div className={`flex items-center justify-between w-40 rounded-lg bg-blue-50 h-10`}>
                        <a href="#" className={`py-2.5 px-2 flex items-center`}>
                            <ChevronLeft className={`w-2 h-auto`} />
                        </a>
                        <div>Период</div>
                        <a href="#" className={`py-2.5 px-2 flex items-center`}>
                            <ChevronRight className={`w-2 h-auto`} />
                        </a>
                    </div>
                </div>
                <div className={`relative my-4`}>
                    <div className={`absolute -left-6 -right-6 top-1/2 border border-dashed border-blue-200`}></div>
                    <div className={`flex`}>
                        <div className={`bg-white px-2 relative z-1 text-xs uppercase font-medium`}>Последние результаты</div>
                    </div>
                </div>
                <ul className={`grow overflow-y-auto`}>
                    {/* <li className={`rounded-lg px-6 py-6 bg-blue-50 relative`}>
                        <div className={`text-violet-500 text-sm`}>Доктор ФИО</div>
                        <hr className={`border-dashed border-blue-200 my-1`} />
                        <div className={`font-medium`}>Наименование приема</div>
                        <div className={`text-sm`}>13.05.2022</div>
                        <a href="#" className={`absolute -translate-y-1/2 top-1/2 right-6`} >
                            <ChevronDown className={`w-4 h-auto`} />
                        </a>
                    </li>
                    <li className={`rounded-lg px-6 py-6 bg-blue-50 relative`}>
                        <div className={`text-violet-500 text-sm`}>Доктор ФИО</div>
                        <hr className={`border-dashed border-blue-200 my-1`} />
                        <div className={`font-medium`}>Наименование приема</div>
                        <div className={`text-sm`}>13.05.2022</div>
                        <a href="#" className={`absolute -translate-y-1/2 top-1/2 right-6`} >
                            <ChevronDown className={`w-4 h-auto`} />
                        </a>
                    </li>
                    <li className={`rounded-lg px-6 py-6 bg-blue-50 relative`}>
                        <div className={`text-violet-500 text-sm`}>Доктор ФИО</div>
                        <hr className={`border-dashed border-blue-200 my-1`} />
                        <div className={`font-medium`}>Наименование приема</div>
                        <div className={`text-sm`}>13.05.2022</div>
                        <a href="#" className={`absolute -translate-y-1/2 top-1/2 right-6`} >
                            <ChevronDown className={`w-4 h-auto`} />
                        </a>
                    </li>
                    <li className={`rounded-lg px-6 py-6 bg-blue-50 relative`}>
                        <div className={`text-violet-500 text-sm`}>Доктор ФИО</div>
                        <hr className={`border-dashed border-blue-200 my-1`} />
                        <div className={`font-medium`}>Наименование приема</div>
                        <div className={`text-sm`}>13.05.2022</div>
                        <a href="#" className={`absolute -translate-y-1/2 top-1/2 right-6`} >
                            <ChevronDown className={`w-4 h-auto`} />
                        </a>
                    </li>
                    <li className={`rounded-lg px-6 py-6 bg-blue-50 relative`}>
                        <div className={`text-violet-500 text-sm`}>Доктор ФИО</div>
                        <hr className={`border-dashed border-blue-200 my-1`} />
                        <div className={`font-medium`}>Наименование приема</div>
                        <div className={`text-sm`}>13.05.2022</div>
                        <a href="#" className={`absolute -translate-y-1/2 top-1/2 right-6`} >
                            <ChevronDown className={`w-4 h-auto`} />
                        </a>
                    </li>
                    <li className={`rounded-lg px-6 py-6 bg-blue-50 relative`}>
                        <div className={`text-violet-500 text-sm`}>Доктор ФИО</div>
                        <hr className={`border-dashed border-blue-200 my-1`} />
                        <div className={`font-medium`}>Наименование приема</div>
                        <div className={`text-sm`}>13.05.2022</div>
                        <a href="#" className={`absolute -translate-y-1/2 top-1/2 right-6`} >
                            <ChevronDown className={`w-4 h-auto`} />
                        </a>
                    </li> */}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}
