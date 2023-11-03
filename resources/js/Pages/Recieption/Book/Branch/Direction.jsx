
import ArrowDown from '@/Icons/ArrowDown';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import timestatuses from '@/data/timestatuses';
import { useLayout } from '@/Contexts/LayoutContext';
import Book from '@/Components/Modals/Book';
import React from 'react';
import ArrowLeft from '@/Icons/ArrowLeft';
import ArrowRight from '@/Icons/ArrowRight';


const Day = (props) => {

    const { item, date, specialist } = props
    const { setModal, moment } = useLayout()

    let day = moment(date, 'DD.MM.YYYY').day() === 0 ? 6 : (moment(date, 'DD.MM.YYYY').day() - 1)
    let book = specialist.books.find(book => book.date == date && book.time == item.time);
    let show = !book || book.start === book.time;

    const handleClick = (e) => {
        e.preventDefault()
        setModal(<Book {...props} item={item} date={date} />)
    }

    return <>
        {show ? <div
            onClick={handleClick}
            className={`overflow-hidden relative ${item.days[day] !== 'rest' ? 'cursor-pointer' : ''} ${book ? `row-span-${Math.ceil(book.duration / 5)}` : ``}  border-l px-px leading-tight py-px flex flex-col items-center justify-center border-violet-500 border-b border-b-dashed border-violet-500 ${book ? `${timestatuses.find(ts => ts.code === `active`).color}` : `${timestatuses.find(ts => ts.code === item.days[day]).color}`}`}>
            {book ? <>
                <div className={`text-center w-full whitespace-nowrap text-ellipsis overflow-hidden`}>{book.patient.fio}</div>
                <div className={`text-center w-full whitespace-nowrap text-ellipsis overflow-hidden`}>{book.patient.phone ? book.patient.phone : book.patient.email}</div>
            </> : <div>&nbsp;<br />&nbsp;</div>}
        </div> : ``}
    </>
}

const DirectionOption = (props) => {
    const { direction } = props
    return <>
        <div className={`h-10 px-4 flex items-center`}>
            <span>{direction.title}</span>
        </div>
    </>
}

export default (props) => {

    const { pagetitle, date, prevDate, nextDate, patient, branch, specialists, direction, dateText, directions } = props

    const [openDirections, setOpenDirections] = useState(false)

    return <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
    >
        <div className={`shadow-block rounded-lg bg-white text-sm overflow-hidden flex flex-col p-1 mb-3 min-h-[33.33vh]`}>
            <div className={`py-5 px-6 flex space-x-6`}>
                <div className={`flex capitalize rounded-lg bg-blue-50 overflow-hidden transition flex items-center justify-between min-w-[285px]`}>
                    <Link href={route(`recieption.book.direction`, {
                        patient: patient.id,
                        branch: branch.id,
                        direction: direction.id,
                        date: prevDate
                    })}
                        className={`py-2.5 px-4 hover:bg-slate-100`}>
                        <ArrowLeft className={`w-2 h-auto`} />
                    </Link>
                    <span>{dateText}</span>
                    <Link href={route(`recieption.book.direction`, {
                        patient: patient.id,
                        branch: branch.id,
                        direction: direction.id,
                        date: nextDate
                    })}
                        className={`py-2.5 px-4 hover:bg-slate-100`}>
                        <ArrowRight className={`w-2 h-auto`} />
                    </Link>
                </div>
                <div className={`relative capitalize`}>
                    <a href={`#`} onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenDirections(prev => !prev)
                    }} className={`rounded-lg bg-blue-50 hover:bg-slate-100 transition pr-4 flex items-center justify-between min-w-[285px]`}>
                        <div className={`flex space-x-3 items-center`}>
                            <DirectionOption direction={direction} />
                        </div>
                        <ArrowDown className={`w-[.875rem] h-auto`} />
                    </a>
                    {openDirections ? <ul className={`z-20 absolute bg-blue-50 z-10 top-full left-0 rounded-lg py-1 w-full overflow-y-auto max-h-[24rem]`}>
                        {directions.data.map((direction, sdx) => <li key={`direction-${sdx}`} className={``}>
                            <Link
                                className={`flex space-x-3 pr-4 hover:bg-slate-100 block w-full items-center`}
                                href={route(`recieption.book.direction`, {
                                    patient: patient.id,
                                    branch: branch.id,
                                    direction: direction.id,
                                    date: date
                                })}>
                                <DirectionOption direction={direction} />
                            </Link>
                        </li>)}
                    </ul> : ``}
                </div>
            </div>
            {specialists.data.length ? <div className='overflow-auto relative w-full flex'>
                <div>
                    <div className={`grid text-center sticky top-0 z-20`} style={{
                        gridTemplateColumns: `5.25rem repeat(${specialists.data.length}, minmax(154px, max-content))`
                    }}>
                        <div className={`bg-slate-100`}></div>
                        {specialists.data.map((specialist, sdx) => <div key={`specialist-${sdx}`} className={`p-5 border-l bg-slate-100 border-l border-violet-500 capitalize`}>{specialist.fio}</div>)}
                    </div>
                    <div className={`grid text-center`} style={{
                        gridTemplateColumns: `5.25rem repeat(${specialists.data.length}, minmax(154px, max-content))`
                    }}>
                        <div className={`h-8 border-b border-violet-500 border-dashed`}></div>
                        {specialists.data.map((specialist, sdx) => <div key={`specialist2-${sdx}`} className={`h-8 border-l border-violet-500 border-b border-violet-500 border-b-dashed`}></div>)}
                    </div>
                    <div className={`grid leading-tight`} style={{
                        gridTemplateColumns: `5.25rem repeat(${specialists.data.length}, minmax(154px, max-content))`
                    }}>
                        {specialists.data[0].schedule.map((item, tdx) => <React.Fragment key={tdx}>
                            <div className={` sticky left-0 z-10 bg-white flex items-center justify-center border-b border-violet-500 border-dashed`}>
                                <div className={`absolute px-3 bg-white -translate-y-full`}>{item.time}</div>
                                <div>&nbsp;<br />&nbsp;</div>
                            </div>
                            {specialists.data.map((specialist, ddx) => <Day {...props} key={ddx} specialist={specialist} item={item} />)}
                        </React.Fragment>)}
                    </div>
                    <div className={`grid leading-tight`} style={{
                        gridTemplateColumns: `5.25rem repeat(${specialists.data.length}, minmax(154px, max-content))`
                    }}>
                        <div className={`sticky left-0 z-10 flex items-center justify-center`}>
                            <div className={`absolute px-3 bg-white -translate-y-full`}>19:30</div>
                            <div>&nbsp;<br />&nbsp;</div>
                        </div>
                        {specialists.data.map(specialist => <div key={specialist.id} className={`h-8`}></div>)}
                    </div>
                </div>
            </div> : ``}
        </div>
        <div className={`grid grid-cols-5 gap-4 text-sm`}>
            {timestatuses.map((ts, tdx) => <div key={tdx} className={`flex items-center`}>
                <div className={`w-10 h-10 ${ts.color} border border-black mr-3 shrink-0`}></div>
                <div>{ts.title}</div>
            </div>)}
        </div>
    </AuthenticatedLayout >
}
