import timestatuses from '@/data/timestatuses';
import ArrowDown from "@/Icons/ArrowDown";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, useForm, usePage, Link } from '@inertiajs/react';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

const Day = (props) => {

    const { branch, specialist, auth } = usePage().props
    const { day, lastChecked, rootRef, checkedArr } = props

    const [open, setOpen] = useState(false)

    const { data, setData, patch, transform } = useForm({
        id: day.id,
        status: null
    })

    const [checked, setChecked] = useState(false)

    const closeMenu = () => setOpen(false)

    const checkboxRef = useRef(null);

    useEffect(() => {
        if (data.status) {
            patch(route(`${auth.user.role.name}.specialist.schedule.update`, {
                specialist: specialist.id,
                branch: branch.id
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

    return <div className={`relative border-l w-32 shrink-0 border-violet-500 ${timestatuses.find(ts => ts.code === day.status).color}`}
        onClick={e => {
            e.stopPropagation();
            document.dispatchEvent(new Event('closedaysmenu'));
            setOpen(true)
        }}>
        <div>&nbsp;<br />&nbsp;</div>
        {open ? <div className={`absolute border bg-white shadow-block z-30 text-left right-0`}>
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

    const { pagetitle, specialist, branches, branch, schedule, auth } = props

    const [open, setOpen] = useState(false)
    const rootRef = useRef()

    const chooseDay = (day, checked) => {
        document.dispatchEvent(new CustomEvent("chooseDay", { detail: { day, checked } }))
    }

    const setStatus = (status) => {
        router.patch(route(`${auth.user.role.name}.specialist.schedule.update`, {
            specialist: specialist.id,
            branch: branch.id,
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
        heading={<div className={`flex gap-6 justify-between items-start`}>
            <h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>
            <div className={`relative my-1`} onClick={e => e.stopPropagation()}>
                <a href={`#`} onClick={e => setOpen(prev => !prev)}
                    className={`flex itens-center justify-between rounded-lg bg-blue-50 px-4 py-2 min-w-[22.125rem]`}
                >
                    <span>{branch.title}</span>
                    <ArrowDown className={`w-3 h-auto text-blue-200`} />
                </a>
                {open ? <ul className={`absolute top-full left-0 w-full rounded-lg bg-blue-50 z-40`}>
                    {branches.data.map((m, mdx) => <li key={mdx}>
                        <Link href={route(`${auth.user.role.name}.specialist.schedule`, {
                            branch: m.id,
                            specialist: specialist.id
                        })}
                            className={`block px-4 py-2 hover:text-violet-500`}
                            onClick={e => setOpen(false)}>{m.title}</Link>
                    </li>)}
                </ul> : ``}
            </div>
        </div>}
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
                        <div className={`p-5 border-l border-b border-violet-500 w-[56rem] shrink-0`}>+4 недели</div>
                        <div className={`p-5 border-l border-b border-violet-500 w-[56rem] shrink-0`}>+5 недель</div>
                        <div className={`p-5 border-l border-b border-violet-500 w-[56rem] shrink-0`}>+6 недель</div>
                        <div className={`p-5 border-l border-b border-violet-500 w-[56rem] shrink-0`}>+7 недель</div>
                    </div>
                    <div className={`inline-flex bg-slate-100 sticky top-0 z-20`}>
                        <div className={`w-24 shrink-0`}>&nbsp;</div>
                        {schedule[0].days.map((day, tdx) => <div key={tdx} className={`p-5 border-l border-violet-500 w-32 shrink-0`}>
                            <div>{moment(day.date, 'DD.MM.YYYY').format('dddd')}</div>
                            <div>{day.date}</div>
                        </div>)}
                    </div>
                    <div className={`flex`}>
                        <div className={`h-8 w-24 shrink-0`}></div>
                        {schedule[0].days.map((day, tdx) => <div key={tdx} className={`h-8 border-l border-violet-500 w-32 shrink-0 relative`}>
                            <input className="absolute bottom-1 right-1" value={day.date} type="checkbox" onClick={e => chooseDay(day, e.target.checked)} />
                        </div>)}
                    </div>
                    {schedule.map((item, tdx) => <div className={`inline-flex leading-tight border-t border-violet-500 border-dashed`} key={tdx}>
                        <div className={`flex items-center justify-center w-24 shrink-0 sticky left-0 z-20`}>
                            <div className={`absolute px-3 bg-white -translate-y-full`}>{item.time}</div>
                            <div>&nbsp;<br />&nbsp;</div>
                        </div>
                        {item.days.map((day, tdx) => <Day key={tdx} day={day} specialist={specialist} lastChecked={lastChecked} rootRef={rootRef} checkedArr={checkedArr} />)}
                    </div>)}
                    <div className={`inline-flex border-t border-violet-500 border-dashed`}>
                        <div className={`relative flex items-center justify-center w-24 shrink-0`}>
                            <div className={`absolute px-3 bg-white -translate-y-full`}>19:30</div>
                            <div>&nbsp;<br />&nbsp;</div>
                        </div>
                        {schedule[0].days.map((el, tdx) => <div key={tdx} className={`h-8 border-l border-violet-500 w-32 shrink-0`}></div>)}
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
