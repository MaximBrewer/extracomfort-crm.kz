import ChevronLeft from '@/Components/ChevronLeft';
import ChevronRight from '@/Components/ChevronRight';
import BookPayment from '@/Components/Modals/BookPayment';
import BookStatus from '@/Components/Modals/BookStatus';
import ChooseBranche from '@/Components/Modals/ChooseBranche';
import Pencil from '@/Components/Pencil';
import PrimaryButton from '@/Components/PrimaryButton';
import Trash from '@/Components/Trash';
import { useLayout } from '@/Contexts/LayoutContext';
import monthes from '@/data/monthes';
import statuses from '@/data/statuses';
import times from '@/data/times';
import ArrowDown from '@/Icons/ArrowDown';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React, { Fragment, useState } from 'react';

import Filter from '../Common/Filter.jsx'


export default (props) => {

    const { pagetitle, year, prevyear, nextyear, date, dateText, month, branch, branches, reminders } = props

    const { setModal } = useLayout();

    const [open, setOpen] = useState(false)

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={false}
        >
            <div className="pb-12 overflow-hidden flex flex-col">
                <Filter />
                <div className={`flex items-center justify-between`}>
                    <ul className={`flex z-1 relative`}>
                        <li className={`relative`}>
                            <Link href={route('recieption.timetable', {
                                branch: branch
                            })}
                                className={`block rounded-t-lg py-2.5 px-6 shadow-bb font-medium text-3xl bg-blue-50 text-blue-20`}>Записи</Link>
                            <div className={`absolute top-full h-2 left-0 w-full bg-white`}></div>
                        </li>
                        <li className={`relative`}>
                            <a href="#"
                                className={`block rounded-t-lg py-2.5 px-6 shadow-bb font-medium text-3xl bg-white`}
                                onClick={e => {
                                    e.preventDefault();
                                }}>Брони</a>
                            <div className={`absolute top-full h-2 left-0 w-full bg-white`}></div>
                        </li>
                    </ul>
                    <div className={`relative my-1`} onClick={e => e.stopPropagation()}>
                        <a href={`#`} onClick={e => setOpen(prev => !prev)}
                            className={`flex itens-center justify-between rounded-lg bg-blue-50 px-4 py-2 min-w-[22.125rem]`}
                        >
                            <span>{branch.title}</span>
                            <ArrowDown className={`w-3 h-auto text-blue-200`} />
                        </a>
                        {open ? <ul className={`absolute top-full left-0 w-full rounded-lg bg-blue-50`}>
                            {branches.data.map((m, mdx) => <li key={mdx}>
                                <Link href={route(`recieption.reminders`, { branch: m.id })}
                                    className={`block px-4 py-2 hover:text-violet-500`}
                                    onClick={e => setOpen(false)}>{m.title}</Link>
                            </li>)}
                        </ul> : ``}
                    </div>
                </div>
                <div className={`shadow-bb rounded-lg bg-white py-5 px-4 overflow-hidden flex flex-col`}>
                    <div className={`text-lg font-medium mb-5 capitalize`}>{dateText}</div>
                    <div className={`flex items-center bg-slate-100 rounded-lg -mx-3`}>
                        <Link href={route(`recieption.reminders`, {
                            branch: branch,
                            date: prevyear
                        })} className={`flex items-center shrink-0 py-4 px-4 hover:scale-110`}>
                            <ChevronLeft className={`h-4 w-auto`} />
                        </Link>
                        <ul className={`grow grid grid-cols-6 text-center py-1.5`}>
                            {monthes.map((item, idx) => <React.Fragment key={idx}>
                                {(month < 7 && idx < 6) || (month > 6 && idx > 5) ? <li className={`flex justify-center`}>
                                    <Link href={route(`recieption.reminders`, {
                                        branch: branch,
                                        date: `${idx < 9 ? `0` : ``}${idx * 1 + 1}.${year}`
                                    })} className={`py-3 px-3 rounded-lg ${month == idx + 1 ? `bg-white shadow-block` : `hover:bg-white hover:shadow-block`} cursor-pointer`}>
                                        <div className={`text-violet-500`}>{item.name}</div>
                                        <div className={`text-[.625rem] uppercase text-gray-600`}>{year}</div>
                                    </Link>
                                </li> : ``}
                            </React.Fragment>)}
                        </ul>
                        <Link href={route(`recieption.reminders`, {
                            branch: branch,
                            date: nextyear
                        })} className={`flex items-center shrink-0 py-4 px-4 hover:scale-110`}>
                            <ChevronRight className={`h-4 w-auto`} />
                        </Link>
                    </div>
                    <div className={`overflow-y-auto -mr-3 pr-3`}>
                        {reminders.data.length ? <div className={`overflow-hidden`}>
                            {reminders.data.map((reminder, tdx) => <React.Fragment key={tdx}>
                                {!reminders.data[tdx - 1] || reminders.data[tdx - 1].date !== reminder.date ? <>
                                    <div className={`relative my-4`}>
                                        <div className={`absolute -left-4 -right-4 top-1/2 border border-dashed border-blue-200`}></div>
                                        <div className={`flex`}>
                                            <div className={`bg-white px-2 relative z-1 text-xs uppercase font-medium`}>{reminder.date}</div>
                                        </div>
                                    </div>
                                </> : ``}
                                <div className={`flex space-x-5 items-center mb-5 rounded-lg overflow-hidden py-3 bg-blue-50 hover:bg-white hover:shadow-block`}>
                                    <div className={`w-[40%] flex space-x-5 items-center pl-5`}>
                                        <div className={`grow`}>
                                            <div className={`font-medium`}>{reminder.patient.fullName}</div>
                                            <div className={``}>{reminder.patient.phone ? reminder.patient.phone : reminder.patient.email}</div>
                                            {reminder.specialist ? <div className={`text-sm font-medium`}>{reminder.specialist.fio}</div> : <></>}
                                            {reminder.service ? <>
                                                <div className={`text-sm font-medium flex gap-2`}>
                                                    {reminder.service.category ? <>
                                                        {reminder.service.category.direction ? <span className={``}>{reminder.service.category.direction.title}</span> : <></>}
                                                        {reminder.service.category.title != reminder.service.title ?
                                                            <span className={``}>{reminder.service.category.title}</span> : <></>}
                                                    </> : <></>}
                                                    <span>{reminder.service.title}</span>
                                                </div>
                                            </> : <></>}
                                            {reminder.comment ? <div className={`text-sm my-2`}>{reminder.comment}</div> : <></>}
                                        </div>
                                    </div>
                                    <div className={`text-violet-500 text-sm w-[40%]`}>
                                        {/* <div className={`font-medium`}>{reminder.specialist.fullName}</div> */}
                                        {/* <ul className={`flex space-x-3`}>
                                            {reminder.specialist.directions.map((dir, ddx) => <li key={ddx}>{dir.title}</li>)}
                                        </ul> */}
                                    </div>
                                    <div className={`text-sm w-[20%] flex justify-end -my-3`}>
                                        <div className={`pr-5`}>
                                            <div onClick={e => {
                                                e.preventDefault()
                                                e.stopPropagation();
                                                setModal(<ChooseBranche {...props} user={reminder.patient} component={`book`} />)
                                            }}>
                                                <PrimaryButton className={`min-w-[90px] justify-center`} size={`xs`}>
                                                    <span>Записать</span>
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>)}
                        </div> : <div className={`relative my-4 text-center`}>
                            <div className={`text-2xl font-semibold py-8`}>Нет напоминаний</div>
                        </div>}
                    </div>
                </div>
            </div >
        </AuthenticatedLayout >
    );
}
