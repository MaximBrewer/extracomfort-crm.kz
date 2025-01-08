import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Fragment } from 'react';
import { Th, Td, Navigate } from './Components';
import Filter from './Filter';
import moment from 'moment';

export default (props) => {

    const {
        pagetitle,
        results = { data: [] }
    } = props

    const getSum = () => {
        let sum = 0;
        results.data.map(result => result.books.map(book => sum += book.payments.length ? book.payments[0].sum : 0))
        return sum;
    }

    const rSum = (r) => {
        let sum = 0;
        r.map(book => sum += book.payments.length ? book.payments[0].sum : 0)
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
                {results.data.length ? <div className="overflow-auto">
                    <table className="my-6 table-auto w-full mb-16 text-xs">
                        <thead>
                            <tr>
                                <Th rowSpan={1}>№</Th>
                                <Th rowSpan={1}>дата</Th>
                                <Th rowSpan={1}>ФИО пациента</Th>
                                <Th rowSpan={1}>услуга</Th>
                                <Th rowSpan={1}>специалист</Th>
                                <Th rowSpan={1}>сумма</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.data.map((result, rdx) => <Fragment key={rdx}>
                                {rSum(result.books) > 0 ? <>
                                    <tr><Th colSpan={6} className={`text-left`}><span className='font-bold text-sm'>{result.title}</span></Th></tr>
                                    {result.books ? result.books.map((book, cdx) => <tr key={cdx}>
                                        <Td>{1 + cdx}</Td>
                                        <Td>{book.date} {book.time}</Td>
                                        <Td className={`text-left`}>{book.patient.fio}</Td>
                                        <Td className={`text-left`}>{book.service.title}</Td>
                                        <Td className={`text-left`}>{book.specialist.fio}</Td>
                                        <Td className={`text-center`}>{book.payments.length ? book.payments[0].sum : ``}</Td>
                                    </tr>) : <></>}
                                    <tr>
                                        <Td colSpan={5} className={`text-right font-bold text-sm`}>Итого:</Td>
                                        <Td colSpan={1} className={`text-center`}>{rSum(result.books)}</Td>
                                    </tr>
                                </> : <>
                                </>}
                            </Fragment>)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <Td colSpan={5} className={`text-right font-bold text-sm`}>Итого по филиалу:</Td>
                                <Td colSpan={1} className={`text-center`}>{getSum()}</Td>
                            </tr>
                        </tfoot>
                    </table>
                </div> : <></>}
            </div >
        </AuthenticatedLayout >
    );
}
