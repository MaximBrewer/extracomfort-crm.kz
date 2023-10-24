import timestatuses from '@/data/timestatuses';
import weekdays from '@/data/weekdays';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';

const Day = (props) => {

    const { item, day, specialist } = props
    const [open, setOpen] = useState(false)

    const { data, setData, patch, transform } = useForm({
        day: day,
        time: item.time,
        status: null
    })

    const closeMenu = () => setOpen(false)

    useEffect(() => {
        document.addEventListener('closedaysmenu', closeMenu)
        return () => {
            document.removeEventListener('closedaysmenu', closeMenu)
        }
    }, [])

    useEffect(() => {
        if (data.status) {
            patch(route(`nurse.specialist.schedule.update`, {
                specialist: specialist.id
            }), {
                onSuccess: () => {
                    setOpen(false)
                }
            });
        }
    }, [data.status])

    transform((data) => {
        return { ...data }
    })

    return <div className={`relative border-l border-violet-500 ${timestatuses.find(ts => ts.code === item.days[day]).color}`}
        onClick={e => {
            e.stopPropagation();
            document.dispatchEvent(new Event('closedaysmenu'));
            setOpen(true)
        }}>
        <div>&nbsp;<br />&nbsp;</div>
        {open ? <div className={`absolute border bg-white shadow-block z-10 text-left right-0`}>
            <ul className={`whitespace-nowrap`}>
                {['free', 'cfree', 'rest'].map((status, sdx) => <li key={sdx}>
                    <label htmlFor={status} className={`flex items-center hover:bg-slate-100 cursor-pointer p-1`}>
                        <input type={`radio`} id={status} value={status} name={`status`} className={`opacity-0 hidden`} onChange={e => {
                            setData('status', status);
                        }} />
                        <div className={`w-4 h-4 ${timestatuses.find(ts => ts.code === status).color} border border-black mr-3 shrink-0`}></div>
                        <div>{timestatuses.find(ts => ts.code === status).html}</div>
                    </label>
                </li>)}
            </ul>
        </div> : ``}
    </div >
}

export default (props) => {

    const { pagetitle, specialist } = props

    let times = [];
    for (let i in specialist.monday) {
        times.push()
    }

    return <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
    >
        <Head title={pagetitle} />
        <div className={`shadow-block rounded-lg bg-white text-sm text-center overflow-hidden flex flex-col p-1 mb-3`}>
            <div className='overflow-y-auto'>
                <div className={`grid grid-cols-[5.25rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-slate-100`}>
                    <div className={``}></div>
                    {weekdays.map((weekday, wdx) => <div key={wdx} className={`p-5 border-l border-violet-500`}>{weekday.title}</div>)}
                </div>
                <div className={`grid grid-cols-[5.25rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr]`}>
                    <div className={`h-8`}></div>
                    {[0, 1, 2, 3, 4, 5, 6].map(day => <div key={day} className={`h-8 border-l border-violet-500`}></div>)}
                </div>
                {specialist.schedule.map((item, tdx) => <div className={`grid grid-cols-[5.25rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] leading-tight border-t border-violet-500 border-dashed`} key={tdx}>
                    <div className={`relative flex items-center justify-center`}>
                        <div className={`absolute px-3 bg-white -translate-y-full`}>{item.time}</div>
                        <div>&nbsp;<br />&nbsp;</div>
                    </div>
                    {[0, 1, 2, 3, 4, 5, 6].map(day => <Day key={day} day={day} item={item} specialist={specialist} />)}
                </div>)}
                <div className={`grid grid-cols-[5.25rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-t border-violet-500 border-dashed`}>
                    <div className={`relative flex items-center justify-center`}>
                        <div className={`absolute px-3 bg-white -translate-y-full`}>19:30</div>
                        <div>&nbsp;<br />&nbsp;</div>
                    </div>
                    {[0, 1, 2, 3, 4, 5, 6].map(day => <div key={day} className={`h-8 border-l border-violet-500`}></div>)}
                </div>
            </div>
        </div>
        <div className={`grid grid-cols-5 gap-4 text-sm`}>
            {timestatuses.map((ts, tdx) => <React.Fragment key={tdx}>
                {ts.code === `active` || ts.code === `active` ? `` : <div className={`flex items-center`}>
                    <div className={`w-10 h-10 ${ts.color} border border-black mr-3 shrink-0`}></div>
                    <div>{ts.title}</div>
                </div>}
            </React.Fragment>)}
        </div>
    </AuthenticatedLayout>
}
