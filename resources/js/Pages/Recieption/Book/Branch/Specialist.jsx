
import ArrowDown from '@/Icons/ArrowDown';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import timestatuses from '@/data/timestatuses';
import { useLayout } from '@/Contexts/LayoutContext';
import Book from '@/Components/Modals/Book';
import React from 'react';


const Day = (props) => {

    const { item, day, books, currentWeek, specialist } = props
    const { setModal } = useLayout()

    let book = books.data.find(book => book.date == currentWeek.days[day].date && book.time == item.time);

    let show = !book || book.start === book.time;

    return <>
        {show ? <div
            onClick={e => item.days[day] !== 'rest' && !book ? setModal(<Book {...props} item={item} day={day} specialist={specialist} />) : void (0)}
            className={`overflow-hidden relative ${item.days[day] !== 'rest' ? 'cursor-pointer' : ''} ${book ? `row-span-${Math.ceil(book.duration / 5)}` : ``} border-l px-px leading-tight py-px flex flex-col items-center justify-center border-violet-500 border-b border-b-dashed border-violet-500 ${book ? `${timestatuses.find(ts => ts.code === `active`).color}` : `${timestatuses.find(ts => ts.code === item.days[day]).color}`}`}>
            {/* <div className='absolute'>{day}</div> */}
            {book ? <>
                <div className={`text-center w-full whitespace-nowrap text-ellipsis overflow-hidden`}>{book.patient.fio}</div>
                <div className={`text-center w-full whitespace-nowrap text-ellipsis overflow-hidden`}>{book.patient.phone ? book.patient.phone : book.patient.email}</div>
            </> : <div>&nbsp;<br />&nbsp;</div>}
        </div> : ``}
    </>
}

const SpecialistOption = (props) => {
    const { specialist } = props
    return <>
        <div className="w-10 h-10 bg-cover rounded bg-center" style={{ backgroundImage: `url('${specialist.avatar}')` }}></div>
        <div>{specialist.lastname}{specialist.name ? ` ${specialist.name.substr(0, 1).toUpperCase()}.` : ``}{specialist.surname ? ` ${specialist.surname.substr(0, 1).toUpperCase()}.` : ``}</div>
    </>
}

export default (props) => {

    const { pagetitle, specialist, week, weeks, patient, branch, specialists } = props

    const currentWeek = weeks.find(item => item.value == week)
    const [openWeeks, setOpenWeeks] = useState(false)
    const [openSpecialists, setOpenSpecialists] = useState(false)

    const close = () => {
        setOpenWeeks(false)
        setOpenSpecialists(false)
    }

    useEffect(() => {
        if (openWeeks) {
            document.addEventListener('click', close)
        } else {
            document.removeEventListener('click', close)
        }
        return () => {
            document.removeEventListener('click', close)
        }
    }, [openWeeks])

    return <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
    >
        <div className={`shadow-block rounded-lg bg-white text-sm overflow-hidden flex flex-col p-1 mb-3`}>
            <div className={`py-5 px-6 flex space-x-6`}>
                <div className={`relative capitalize`}>
                    <a href={`#`} onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenWeeks(prev => !prev)
                    }} className={`rounded-lg bg-blue-50 hover:bg-slate-100 transition py-2.5 px-4 flex items-center justify-between min-w-[285px]`}>
                        <div className={`flex space-x-3 `}>
                            <span>Неделя:</span>
                            <span>{currentWeek.label}</span>
                        </div>
                        <ArrowDown className={`w-[.875rem] h-auto`} />
                    </a>
                    {openWeeks ? <ul className={`z-20 absolute bg-blue-50 z-10 top-full left-0 rounded-lg py-1 w-full`}>
                        {weeks.map((week, wdx) => <li key={wdx} className={`text-justify w-full`}>
                            <Link
                                className={`flex space-x-3 py-2 px-3 hover:bg-slate-100 block w-full text-justify`}
                                href={route(`recieption.book.specialist`, {
                                    patient: patient.id,
                                    branch: branch.id,
                                    specialist: specialist.id,
                                    week: week.value,
                                    year: (new Date).getFullYear(),
                                })}>
                                <span>Неделя:</span>
                                <span>{week.label}</span>
                            </Link>
                        </li>)}
                    </ul> : ``}
                </div>
                <div className={`relative capitalize`}>
                    <a href={`#`} onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenSpecialists(prev => !prev)
                    }} className={`rounded-lg bg-blue-50 hover:bg-slate-100 transition pr-4 flex items-center justify-between min-w-[285px]`}>
                        <div className={`flex space-x-3 items-center`}>
                            <SpecialistOption specialist={specialist} />
                        </div>
                        <ArrowDown className={`w-[.875rem] h-auto`} />
                    </a>
                    {openSpecialists ? <ul className={`z-20 absolute bg-blue-50 z-10 top-full left-0 rounded-lg py-1 w-full overflow-y-auto max-h-[24rem]`}>
                        {specialists.map((specialist, sdx) => <li key={sdx} className={``}>
                            <Link
                                className={`flex space-x-3 pr-4 hover:bg-slate-100 block w-full items-center`}
                                href={route(`recieption.book.specialist`, {
                                    patient: patient.id,
                                    branch: branch.id,
                                    specialist: specialist.id,
                                    week: week,
                                    year: (new Date).getFullYear(),
                                })}>
                                <SpecialistOption specialist={specialist} />
                            </Link>
                        </li>)}
                    </ul> : ``}
                </div>
            </div>
            <div className='overflow-y-auto'>
                <div className={`grid grid-cols-[5.25rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-slate-100 text-center sticky top-0 z-10`}>
                    <div className={``}></div>
                    {currentWeek.days.map((weekday, wdx) => <div key={wdx} className={`p-5 border-l ${weekday.today ? `bg-violet-500 text-white` : ``} border-violet-500 capitalize`}>{weekday.title}</div>)}
                </div>
                <div className={`grid grid-cols-[5.25rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr]`}>
                    <div className={`h-8`}></div>
                    {[0, 1, 2, 3, 4, 5, 6].map(day => <div key={day} className={`h-8 border-l border-violet-500`}></div>)}
                </div>
                <div className={`grid grid-cols-[5.25rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] leading-tight border-violet-500`}>
                    {specialist.schedule.map((item, tdx) => <React.Fragment key={tdx}>
                        <div className={`relative flex items-center justify-center border-t border-dashed`}>
                            <div className={`absolute px-3 bg-white -translate-y-full`}>{item.time}</div>
                            <div>&nbsp;<br />&nbsp;</div>
                        </div>
                        {[0, 1, 2, 3, 4, 5, 6].map(day => <Day {...props} key={day} day={day} item={item} currentWeek={currentWeek} specialist={specialist} />)}
                    </React.Fragment>)}
                </div>
                <div className={`grid grid-cols-[5.25rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] leading-tight`}>
                    <div className={`relative flex items-center justify-center`}>
                        <div className={`absolute px-3 bg-white -translate-y-full`}>19:30</div>
                        <div>&nbsp;<br />&nbsp;</div>
                    </div>
                    {[0, 1, 2, 3, 4, 5, 6].map(day => <div key={day} className={`h-8`}></div>)}
                </div>
            </div>
        </div >
        <div className={`grid grid-cols-5 gap-4 text-sm`}>
            {timestatuses.map((ts, tdx) => <div key={tdx} className={`flex items-center`}>
                <div className={`w-10 h-10 ${ts.color} border border-black mr-3 shrink-0`}></div>
                <div>{ts.title}</div>
            </div>)}
        </div>
    </AuthenticatedLayout >
}
