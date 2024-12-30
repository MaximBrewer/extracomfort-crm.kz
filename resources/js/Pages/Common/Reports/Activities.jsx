import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Fragment } from 'react';
import { Th, Td, Navigate } from './Components';
import Filter from './Filter';

export default (props) => {

    const {
        pagetitle,
        results = { data: [] },
    } = props

    const sum = (books) => {
        let sum = 0;
        for (let b of books) {
            console.log(b)
            sum += b.sum
        }
        return sum
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
                {results.data.filter(dir => dir.specialists.filter(spe => spe.books.length).length).length ? <div className="overflow-auto">
                    <table className="my-6 table-auto w-full mb-16 text-xs">
                        <thead>
                            <tr>
                                <Th rowSpan={1}>дата</Th>
                                <Th rowSpan={1}>ФИО пациента</Th>
                                <Th rowSpan={1}>оказанные услуги</Th>
                                <Th rowSpan={1}>стоимость услуги</Th>
                                <Th rowSpan={1}>оплачено в кассу</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.data.map((direction, ddx) => <Fragment key={ddx}>
                                {direction.specialists && direction.specialists.length && direction.specialists.filter(el => el.books.length).length ? <>
                                    <tr><Th colSpan={5} className={`text-left`}><strong>{direction.title}</strong></Th></tr>
                                    {direction.specialists.map((specialist, sdx) => <Fragment key={sdx}>
                                        {specialist.books.length ? <><tr><Th colSpan={5} className={`text-left`}><strong>{specialist.fullName}</strong></Th></tr>
                                            {specialist.books.map((book, bdx) => <tr key={bdx}>
                                                <Td>{book.date}</Td>
                                                <Td>{book.patient}</Td>
                                                <Td>{book.service}</Td>
                                                <Td>{book.sum}</Td>
                                                <Td>{book.sum}</Td>
                                            </tr>)}
                                            <tr>
                                                <Td><strong>итого по специалисту:</strong> </Td>
                                                <Td>{specialist.books.length}</Td>
                                                <Td></Td>
                                                <Td>{sum(specialist.books)}</Td>
                                                <Td>{sum(specialist.books)}</Td>
                                            </tr>
                                        </> : <></>}
                                    </Fragment>)}
                                </> : <></>}
                            </Fragment>)}
                        </tbody>
                        <tfoot>
                            {/* <tr>
                                <Td colSpan={3} className={`text-right font-bold text-sm`}>Итого по филиалу:</Td>
                                <Td colSpan={1} className={`text-center`}>{getQuantity()}</Td>
                                <Td colSpan={1} className={`text-center`}>{getSum()}</Td>
                            </tr> */}
                        </tfoot>
                    </table>
                </div> : <></>}
            </div >
        </AuthenticatedLayout >
    );
}
