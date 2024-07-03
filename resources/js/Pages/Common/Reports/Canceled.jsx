import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Th, Td, Navigate } from './Components';
import Filter from './Filter';

export default (props) => {

    const {
        pagetitle,
        books = { data: [] }
    } = props

    const countLost = () => {
        let sum = 0;
        books.data.map(el => el.status === 'lost' && ++sum)
        return sum;
    }

    const countCanceled = () => {
        let sum = 0;
        books.data.map(el => el.status === 'canceled' && ++sum)
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
                                <Th rowSpan={2}>перв/повт</Th>
                                <Th colSpan={2}>статус приема</Th>
                            </tr>
                            <tr>
                                <Th>не пришел</Th>
                                <Th>отменил</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.data.map((book, rdx) => <tr key={rdx}>
                                <Td className={`text-center`}>{book.date}</Td>
                                <Td>{book.patient.fio}</Td>
                                <Td>{book.service.title}</Td>
                                <Td className={`text-center`}>{book.repeated ? `перв` : `повт`}</Td>
                                <Td className={`text-center`}>{book.status == 'lost' ? 'x' : ''}</Td>
                                <Td className={`text-center`}>{book.status == 'canceled' ? 'x' : ''}</Td>
                            </tr>)}
                        </tbody>
                        {/* ENUM('none', 'confirmed', 'lost', 'canceled', 'completed') */}
                        <tfoot>
                            <tr>
                                <Td colSpan={4} className={`text-right`}>Итого:</Td>
                                <Td className={`text-center`}>{countLost()}</Td>
                                <Td className={`text-center`}>{countCanceled()}</Td>
                            </tr>
                        </tfoot>
                    </table>
                </div> : <></>}
            </div>
        </AuthenticatedLayout >
    );
}
