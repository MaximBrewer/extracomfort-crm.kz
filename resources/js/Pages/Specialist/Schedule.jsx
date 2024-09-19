import timestatuses from '@/data/timestatuses';
import weekdays from '@/data/weekdays';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

const Day = (props) => {

    const { item, day, specialist, lastChecked, rootRef, checkedArr } = props
    const [open, setOpen] = useState(false)

    const { data, setData, patch, transform } = useForm({
        day: day,
        time: item.time,
        status: null
    })

    const [checked, setChecked] = useState(false)

    const closeMenu = () => setOpen(false)

    const checkboxRef = useRef(null);

    useEffect(() => {
        if (data.status) {
            patch(route(`specialist.schedule.update`, {
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

    const choose = e => {
        e.stopPropagation();
        let cur = {
            y: e.target.getBoundingClientRect().y - rootRef.current.getBoundingClientRect().y,
            x: e.target.getBoundingClientRect().x - rootRef.current.getBoundingClientRect().x,
            checked: e.target.checked
        };
        if (e.shiftKey) {
            document.dispatchEvent(new CustomEvent('checkPeriod', {
                detail: [
                    lastChecked.current,
                    cur
                ]
            }))
        }
        lastChecked.current = cur;
    }

    const checkPeriod = (e) => {
        let x = checkboxRef.current.getBoundingClientRect().x - rootRef.current.getBoundingClientRect().x,
            y = checkboxRef.current.getBoundingClientRect().y - rootRef.current.getBoundingClientRect().y
        if (
            (
                (
                    x >= e.detail[0].x
                    && x <= e.detail[1].x
                )
                || (
                    x >= e.detail[1].x
                    && x <= e.detail[0].x
                )
            )
            && (
                (
                    y >= e.detail[0].y
                    && y <= e.detail[1].y
                )
                || (
                    y >= e.detail[1].y
                    && y <= e.detail[0].y
                )
            )
        ) setChecked(e.detail[0].checked)
    }

    const chooseDay = (e) => {
        e.detail.day == day && setChecked(e.detail.checked)
    }

    const uncheckAll = (e) => {
        console.log(e)
        setChecked(false)
    }

    useEffect(() => {
        let fdx = checkedArr.current.findIndex(el => el.time == item.time && el.day == day)
        if (checked) {
            fdx < 0 && checkedArr.current.push({
                day: day,
                time: item.time
            })
        } else {
            fdx > -1 && checkedArr.current.splice(fdx, 1)
        }
    }, [checked])

    useEffect(() => {
        document.addEventListener('uncheckAll', uncheckAll)
        document.addEventListener('chooseDay', chooseDay)
        document.addEventListener('checkPeriod', checkPeriod)
        document.addEventListener('closedaysmenu', closeMenu)
        return () => {
            document.removeEventListener('uncheckAll', uncheckAll)
            document.removeEventListener('chooseDay', chooseDay)
            document.removeEventListener('checkPeriod', checkPeriod)
            document.removeEventListener('closedaysmenu', closeMenu)
        }
    }, [])

    return <div className={`relative border-l w-32 shrink-0 border-violet-500 ${timestatuses.find(ts => ts.code === item.days[day]).color}`}
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
        <input className="absolute bottom-1 right-1" type="checkbox" ref={checkboxRef} onClick={choose} checked={checked} onChange={e => setChecked(e.target.checked)} />
    </div >
}

export default (props) => {

    const { pagetitle, specialist, startOfWeek } = props
    console.log(moment(startOfWeek))

    let times = [];
    for (let i in specialist.monday) {
        times.push()
    }

    const rootRef = useRef()

    const chooseDay = (day, checked) => {
        document.dispatchEvent(new CustomEvent("chooseDay", { detail: { day, checked } }))
    }

    const setStatus = (status) => {
        router.patch(route(`specialist.schedule.update`, {
            specialist: specialist.id,
            items: checkedArr.current,
            status,
        }))
        document.dispatchEvent(new Event('uncheckAll'));
    }

    const lastChecked = useRef(null);
    const checkedArr = useRef([]);

    return <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
    >
        <div className={`shadow-block rounded-lg bg-white text-sm text-center overflow-hidden flex flex-col p-1 mb-3 relative`}>
            <div className='overflow-auto'>
                <div ref={rootRef}>
                    <div className={`inline-flex bg-slate-100`}>
                        <div className={`w-24 shrink-0`}>&nbsp;</div>
                        <div className={`p-5 border-l border-b border-violet-500 w-[56rem] shrink-0`}>Текущая неделя</div>
                        <div className={`p-5 border-l border-b border-violet-500 w-[56rem] shrink-0`}>+1 неделя</div>
                        <div className={`p-5 border-l border-b border-violet-500 w-[56rem] shrink-0`}>+2 недели</div>
                        <div className={`p-5 border-l border-b border-violet-500 w-[56rem] shrink-0`}>+3 недели</div>
                    </div>
                    <div className={`inline-flex bg-slate-100  sticky top-0 z-20`}>
                        <div className={`w-24 shrink-0`}>&nbsp;</div>
                        {weekdays.map((weekday, wdx) => <div key={wdx} className={`p-5 border-l border-violet-500 w-32 shrink-0`}>
                            <div>{weekday.title}</div>
                            <div>{moment(startOfWeek).add(wdx, 'days').format('DD.MM.YYYY')}</div>
                        </div>)}
                        {weekdays.map((weekday, wdx) => <div key={wdx} className={`p-5 border-l border-violet-500 w-32 shrink-0`}>
                            <div>{weekday.title}</div>
                            <div>{moment(startOfWeek).add(wdx + 7, 'days').format('DD.MM.YYYY')}</div>
                        </div>)}
                        {weekdays.map((weekday, wdx) => <div key={wdx} className={`p-5 border-l border-violet-500 w-32 shrink-0`}>
                            <div>{weekday.title}</div>
                            <div>{moment(startOfWeek).add(wdx + 14, 'days').format('DD.MM.YYYY')}</div>
                        </div>)}
                        {weekdays.map((weekday, wdx) => <div key={wdx} className={`p-5 border-l border-violet-500 w-32 shrink-0`}>
                            <div>{weekday.title}</div>
                            <div>{moment(startOfWeek).add(wdx + 21, 'days').format('DD.MM.YYYY')}</div>
                        </div>)}
                    </div>
                    <div className={`flex`}>
                        <div className={`h-8 w-24 shrink-0`}></div>
                        {Array(28).fill(null).map((el, day) => <div key={day} className={`h-8 border-l border-violet-500 w-32 shrink-0 relative`}>
                            <input className="absolute bottom-1 right-1" type="checkbox" onClick={e => chooseDay(day, e.target.checked)} />
                        </div>)}
                    </div>
                    {specialist.schedule.map((item, tdx) => <div className={`inline-flex leading-tight border-t border-violet-500 border-dashed`} key={tdx}>
                        <div className={`relative flex items-center justify-center w-24 shrink-0`}>
                            <div className={`absolute px-3 bg-white -translate-y-full`}>{item.time}</div>
                            <div>&nbsp;<br />&nbsp;</div>
                        </div>
                        {Array(28).fill(null).map((el, day) => <Day key={day} day={day} item={item} specialist={specialist} lastChecked={lastChecked} rootRef={rootRef} checkedArr={checkedArr} />)}
                    </div>)}
                    <div className={`inline-flex border-t border-violet-500 border-dashed`}>
                        <div className={`relative flex items-center justify-center w-24 shrink-0`}>
                            <div className={`absolute px-3 bg-white -translate-y-full`}>19:30</div>
                            <div>&nbsp;<br />&nbsp;</div>
                        </div>
                        {Array(28).fill(null).map((el, day) => <div key={day} className={`h-8 border-l border-violet-500 w-32 shrink-0`}></div>)}
                    </div>
                </div>
            </div>
        </div>
        <div className={`grid grid-cols-5 gap-4 text-sm`}>
            {timestatuses.map((ts, tdx) => <React.Fragment key={tdx}>
                {ts.code === `active` || ts.code === `cactive` ? `` : <div className={`flex items-center`} onClick={e => setStatus(ts.code)}>
                    <div className={`w-10 h-10 ${ts.color} border border-black mr-3 shrink-0`}></div>
                    <div>{ts.title}</div>
                </div>}
            </React.Fragment>)}
        </div>
    </AuthenticatedLayout>
}
