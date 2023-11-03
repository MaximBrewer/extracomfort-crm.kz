import ChevronLeft from '@/Components/ChevronLeft';
import ChevronRight from '@/Components/ChevronRight';
import BookPayment from '@/Components/Modals/BookPayment';
import BookStatus from '@/Components/Modals/BookStatus';
import Pencil from '@/Components/Pencil';
import PrimaryButton from '@/Components/PrimaryButton';
import Trash from '@/Components/Trash';
import { useLayout } from '@/Contexts/LayoutContext';
import statuses from '@/data/statuses';
import times from '@/data/times';
import ArrowDown from '@/Icons/ArrowDown';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Fragment, useState } from 'react';

const Status = (props) => {
    const { book } = props;
    const { setModal } = useLayout();
    const status = statuses.data.find(s => s.code == book.status)

    return <div className={`h-10 flex items-center justify-end`}>
        <div className={`${status.color} mr-4`}>{status.title}</div>
    </div>
}

const Payment = (props) => {
    const { book } = props;
    const { setModal, priceFormat } = useLayout();

    let sum = 0;
    for (let p of book.payments) sum = +p.sum

    return <div className={`h-10 flex items-center justify-end`}>
        <div className={`text-gray-300 mr-4`}>{sum ? priceFormat(sum) : `Оплата`}</div>
    </div>
}


export default (props) => {

    const { pagetitle, dateText, weekdays, prevweek, nextweek, books, auth } = props

    const [open, setOpen] = useState(false)

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            heading={false}
        >
            <div className="pb-12 overflow-hidden flex flex-col">
                <div className={`flex items-center justify-between`}>
                    <ul className={`flex z-1 relative`}>
                        <li className={`relative`}>
                            <span
                                className={`block rounded-t-lg py-2.5 px-6 shadow-bb font-medium text-3xl bg-white`}>Расписание</span>
                            <div className={`absolute top-full h-2 left-0 w-full bg-white`}></div>
                        </li>
                    </ul>
                </div>
                <div className={`shadow-bb rounded-lg bg-white py-5 px-4 overflow-hidden flex flex-col`}>
                    <div className={`text-lg font-medium mb-5 capitalize`}>{dateText}</div>
                    <div className={`flex items-center bg-slate-100 rounded-lg -mx-3`}>
                        <Link href={route(`specialist.timetable`, {
                            date: prevweek
                        })} className={`flex items-center shrink-0 py-4 px-4 hover:scale-110`}>
                            <ChevronLeft className={`h-4 w-auto`} />
                        </Link>
                        <ul className={`grow grid grid-cols-7 text-center py-1.5`}>
                            {weekdays.map((item, idx) => <li key={idx} className={`flex justify-center`}>
                                <Link href={route(`specialist.timetable`, {
                                    date: item.date
                                })} className={`py-3 px-3 rounded-lg ${item.selected ? `bg-white shadow-block` : `hover:bg-white hover:shadow-block`} cursor-pointer`}>
                                    <div className={`text-violet-500`}>{item.dateText}</div>
                                    <div className={`text-[.625rem] uppercase text-gray-600`}>{item.weekday}</div>
                                </Link>
                            </li>)}
                        </ul>
                        <Link href={route(`specialist.timetable`, {
                            date: nextweek
                        })} className={`flex items-center shrink-0 py-4 px-4 hover:scale-110`}>
                            <ChevronRight className={`h-4 w-auto`} />
                        </Link>
                    </div>
                    <div className={`overflow-y-auto -mr-3 pr-3`}>
                        {books.data.length ? times.data.map((time, tdx) => <div className={`overflow-hidden`} key={tdx}>
                            {books.data.filter(book => book.start == time.value && book.start == book.time).length ? <>
                                <div className={`relative my-4`}>
                                    <div className={`absolute -left-4 -right-4 top-1/2 border border-dashed border-blue-200`}></div>
                                    <div className={`flex`}>
                                        <div className={`bg-white px-2 relative z-1 text-xs uppercase font-medium`}>{time.label}</div>
                                    </div>
                                </div>
                                {books.data.filter(book => book.start == time.value && book.start == book.time).map((book, bdx) => <Link href={route('specialist.appointment', {
                                    book: book.id
                                })} key={bdx} className={`flex space-x-5 items-center mb-5 rounded-lg overflow-hidden py-3 bg-blue-50 hover:bg-white hover:shadow-block`}>
                                    <div className={`w-[40%] flex space-x-5 items-center pl-5`}>
                                        <div className={`grow`}>
                                            <div className={`font-medium`}>{book.patient.fullName}</div>
                                            <div className={``}>{book.patient.phone ? book.patient.phone : book.patient.email}</div>
                                        </div>
                                    </div>
                                    <div className={`text-sm w-[40%]`}>
                                        <span className={`text-violet-500 font-medium`}>{book.service ? book.service.title : ``}</span>
                                    </div>
                                    <div className={`text-sm w-[20%] flex justify-end -my-3`}>
                                        <div className={`pr-5`}>
                                            <Status book={book} auth={auth} />
                                            <Payment book={book} auth={auth} />
                                        </div>
                                    </div>
                                </Link>)}
                            </> : ``}
                        </div>) : <div className={`relative my-4 text-center`}>
                            <div className={`text-2xl font-semibold py-8`}>Нет записей</div>
                        </div>}
                    </div>
                </div>
            </div >
        </AuthenticatedLayout >
    );
}
