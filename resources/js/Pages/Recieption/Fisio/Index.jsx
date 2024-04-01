import FisioBook from '@/Components/Modals/FisioBook';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useLayout } from '@/Contexts/LayoutContext';
import ArrowDown from '@/Icons/ArrowDown';
import ArrowLeft from '@/Icons/ArrowLeft';
import ArrowRight from '@/Icons/ArrowRight';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import moment from 'moment';
import { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select'


export default (props) => {

    const { pagetitle = ``, fisioCategories, date, books, branch, branches, auth, prevDate, nextDate, dateText } = props

    const BookTizer = ({ time, service }) => {

        let book = books.data.find(book => book.service_id === service.id && book.time === time && book.date === date && book.branch_id === branch.id && !book.second)
        let book2 = books.data.find(book => book.service_id === service.id && book.time === time && book.date === date && book.branch_id === branch.id && book.second)

        return <>
            <div>
                {book ? <div>{book.patient.lastname}</div> : <>
                    <PrimaryButton size="xs" className='' onClick={e => setModal(<FisioBook service={service} date={date} time={time} branch={branch} />)}>записать</PrimaryButton>
                </>}
            </div>
            <div className="mt-0.5">
                {category.double ? <>
                    {book2 ? <div>{book2.patient.lastname}</div> : <>
                        <SecondaryButton size="xs" className='' onClick={e => setModal(<FisioBook service={service} date={date} time={time} branch={branch} second={true} />)}>записать</SecondaryButton>
                    </>}
                </> : <></>}
            </div>
        </>;
    }


    const { setModal } = useLayout()

    const [open, setOpen] = useState(false)
    const [category, setCategory] = useState(fisioCategories.data.length ? fisioCategories.data[0] : null)

    const [times, setTimes] = useState([])

    useEffect(() => {

        if (category) {
            const times = [];

            let curr = moment().set({ hour: 9, minute: 0, second: 0, millisecond: 0 })
            times.push(curr.format('HH:mm'))

            do {
                curr.add('minutes', category.duration)
                times.push(curr.format('HH:mm'))
                console.log()
            } while (curr.hours() < 20)

            setTimes(times)
        }
    }, [category])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={<div className="flex items-center justify-between"><h1 className="font-semibold text-3xl text-gray-800 leading-tight">
                {pagetitle}
            </h1>
                <div className={`flex capitalize rounded-lg bg-blue-50 overflow-hidden transition flex items-center justify-between min-w-[285px]`}>
                    <Link href={route(`recieption.fisio.index`, {
                        branch: branch.id,
                        date: prevDate
                    })}
                        className={`py-2.5 px-4 hover:bg-slate-100`}>
                        <ArrowLeft className={`w-2 h-auto`} />
                    </Link>
                    <span>{dateText}</span>
                    <Link href={route(`recieption.fisio.index`, {
                        branch: branch.id,
                        date: nextDate
                    })}
                        className={`py-2.5 px-4 hover:bg-slate-100`}>
                        <ArrowRight className={`w-2 h-auto`} />
                    </Link>
                </div>
            </div>}
        >
            <div className="pb-12 overflow-hidden flex flex-col">
                <div className={`flex items-center justify-between`}>
                    <ul className={`flex z-1 relative`}>
                        {fisioCategories.data.map((fc, fcdx) => <li key={fcdx} className={`relative`}>
                            <a href="#"
                                className={`block rounded-t-lg py-2 px-6 shadow-bb font-medium text-xl ${category && category.id === fc.id ? `bg-white` : `bg-blue-50 text-blue-20`}`}
                                onClick={e => setCategory(fc)}>{fc.title}</a>
                            <div className={`absolute top-full h-2 left-0 w-full bg-white`}></div>
                        </li>)}
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
                                <Link href={route(`recieption.fisio.index`, { branch: m.id })}
                                    className={`block px-4 py-2 hover:text-violet-500`}
                                    onClick={e => setOpen(false)}>{m.title}</Link>
                            </li>)}
                        </ul> : ``}
                    </div>
                </div>
                <div className={`shadow-bb rounded-lg bg-white py-5 px-4 overflow-y-auto flex flex-col`}>
                    {category ? <table className={`border-collapse table-auto w-full text-sm`}>
                        <thead>
                            <tr>
                                <td className="border py-1 px-2">Время</td>
                                {category.services.map((s, sdx) => <td key={sdx} className="border py-1 px-2 text-center">{s.title}</td>)}
                            </tr>
                        </thead>
                        <tbody>
                            {times.map((tm, tdx) => <tr key={tdx}>
                                <td className="border py-1 px-2">{tm}</td>
                                {category.services.map((s, sdx) => <td key={sdx} className="border py-1 px-2 text-center">
                                    <div className="flex flex-col gap-1 items-center">
                                        <BookTizer service={s} time={tm} />
                                    </div>
                                </td>)}
                            </tr>)}
                        </tbody>
                    </table> : <></>}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
