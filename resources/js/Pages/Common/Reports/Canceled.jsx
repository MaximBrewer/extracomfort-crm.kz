import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Th, Td, Navigate } from './Components';
import Filter from './Filter';

export default (props) => {

    const {
        pagetitle,
        results = { data: [] }
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
                            {results.data.map((result, rdx) => <tr key={rdx}>
                                <Td>{result.date}</Td>
                                <Td>{result.fullname}</Td>
                                <Td>{result.service}</Td>
                                <Td>{result.repeat}</Td>
                                <Td>{result.status == '' ? 'x' : ''}</Td>
                                <Td>{result.status == '' ? 'x' : ''}</Td>
                            </tr>)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <Td colSpan={4}>Итого:</Td>
                                <Td></Td>
                                <Td></Td>
                            </tr>
                        </tfoot>
                    </table>
                </div> : <></>}
            </div >
        </AuthenticatedLayout >
    );
}
