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
        results = { data: [] },
    } = props

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


                {results.data.length ? <div className="overflow-auto">
                    <table className="my-6 table-auto w-full mb-16 text-xs">
                        <thead>
                            <tr>
                                <Th rowSpan={1}>дата</Th>
                                <Th rowSpan={1}>ФИО пациента</Th>
                                <Th rowSpan={1}>оказанные услуги</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.data.map((user, bdx) => <tr key={bdx}>
                                <Td>{user.created_at}</Td>
                                <Td className={`w-1/2`}>{user.full_name}</Td>
                                <Td className={`w-1/2`}>{user.books.map(el => el.service.title).join(', ')}</Td>
                                {/* <Td>{book.service}</Td> */}
                            </tr>)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <Td colSpan={3} className={`text-right font-bold text-sm`}>Итого: {results.data.length}</Td>
                            </tr>
                        </tfoot>
                    </table>
                </div> : <></>}
            </div >
        </AuthenticatedLayout >
    );
}
