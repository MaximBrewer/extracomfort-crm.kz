import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { forwardRef } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import moment from 'moment';
import Select, { components } from 'react-select';
import { useEffect } from 'react';
import paymethods from '@/data/paymethods';
import { Fragment } from 'react';
import { customStyles, Th, Td, CustomInput, DropdownIndicator, Navigate } from './Components';
import Filter from './Filter';

setDefaultLocale(ru);
registerLocale('ru', ru);


export default (props) => {

    const {
        pagetitle,
        books = { data: [] }
    } = props


    const countFree = () => {
        let sum = 0;
        books.data.map(book => book.payment && book.payment.method == 'free' && ++sum)
        return sum;
    }

    const countDiscont = () => {
        let sum = 0;
        books.data.map(book => book.payment && book.payment.sum !== book.payment.price && ++sum)
        return sum;
    }

    const countLoan = () => {
        let sum = 0;
        books.data.map(book => !book.payment && ++sum)
        return sum;
    }

    return (
        <AuthenticatedLayout
            scrollpage={true}
            auth={props.auth}
            errors={props.errors}
            heading={<h1 className="font-semibold text-3xl text-gray-800 leading-tight">{pagetitle}</h1>}
        >
            <div className="rounded-lg shadow-block bg-white pb-12 pt-5 px-8">
                <Navigate {...props} />
                <Filter />
                {books.data.length ? <div className="overflow-auto">
                    <table className="mt-6 table-auto w-full mb-4 text-xs">
                        <thead>
                            <tr>
                                <Th rowSpan={2}>дата</Th>
                                <Th rowSpan={2}>ФИО пациента</Th>
                                <Th rowSpan={2}>услуга</Th>
                                <Th colSpan={3}>тип оплаты</Th>
                            </tr>
                            <tr>
                                <Th>без оплаты</Th>
                                <Th>со скидкой</Th>
                                <Th>долг</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.data.map((book, rdx) => <tr key={rdx}>
                                <Td className={`text-center`}>{book.date}</Td>
                                <Td>{book.patient.fio}</Td>
                                <Td>{book.service.title}</Td>
                                <Td className={`text-center`}>{book.payment && book.payment.method == 'free' ? 'x' : ''}</Td>
                                <Td className={`text-center`}>{book.payment && book.payment.sum !== book.payment.price ? 'x' : ''}</Td>
                                <Td className={`text-center`}>{!book.payment ? 'x' : ''}</Td>
                            </tr>)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <Td colSpan={3} className={`text-right`}>Итого:</Td>
                                <Td className={`text-center`}>{countFree()}</Td>
                                <Td className={`text-center`}>{countDiscont()}</Td>
                                <Td className={`text-center`}>{countLoan()}</Td>
                            </tr>
                        </tfoot>
                    </table>
                </div> : <></>}
            </div >
        </AuthenticatedLayout >
    );
}