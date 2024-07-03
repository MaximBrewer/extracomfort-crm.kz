import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Th, Td, Navigate } from './Components';
import Filter from './Filter';

export default (props) => {

    const {
        pagetitle,
        hears = [],
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
                                <Th rowSpan={1}>рекламный источник</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.data.map((book, bdx) => <tr key={bdx}>
                                <Td>{book.date}</Td>
                                <Td>{book.patient}</Td>
                                <Td>{book.service}</Td>
                                <Td>{book.hear}</Td>
                            </tr>)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <Td colSpan={3} className={`text-right font-bold text-sm align-top`}>Итого:</Td>
                                <Td colSpan={1} className={``}>
                                    {hears.map((hear, hdx) => <div key={hdx}>
                                        {hear.name} - {results.data.filter(book => book.hear == hear.name).length}
                                    </div>)}
                                </Td>
                            </tr>
                        </tfoot>
                    </table>
                </div> : <></>}
            </div >
        </AuthenticatedLayout >
    );
}
