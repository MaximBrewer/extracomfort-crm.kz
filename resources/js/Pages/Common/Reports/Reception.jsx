import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Fragment } from 'react';
import { Th, Td, Navigate } from './Components';
import Filter from './Filter';

export default (props) => {

    const {
        pagetitle,
        results = { data: [] }
    } = props



    const count = (v, id) => {
        let sum = 0;
        for (let dir of results.data) {
            if (!id || id === dir.id)
                for (let spec of dir.specialists) {
                    sum += spec[v]
                }
        }
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
                    <table className="mt-6 table-auto w-full mb-4 text-xs">
                        <thead>
                            <tr>
                                <Th rowSpan={2}>Специалисты</Th>
                                <Th colSpan={3}>Кол-во принятых пациентов</Th>
                            </tr>
                            <tr>
                                <Th>первичные</Th>
                                <Th>повторные</Th>
                                <Th>всего</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.data.map((dir, cdx) => <Fragment key={cdx}>
                                <tr>
                                    <Td colSpan="4"><span className='font-bold'>{dir.title}</span></Td>
                                </tr>
                                {dir.specialists.map((specialist, ddx) =>
                                    <tr key={ddx}>
                                        <Td>{specialist.fullname}</Td>
                                        <Td>{specialist.first}</Td>
                                        <Td>{specialist.repeat}</Td>
                                        <Td>{specialist.total}</Td>
                                    </tr>)}
                                <tr>
                                    <Td><span className='font-bold'>Итого по подразделению:</span></Td>
                                    <Td>{count(`first`, dir.id)}</Td>
                                    <Td>{count(`repeat`, dir.id)}</Td>
                                    <Td>{count(`total`, dir.id)}</Td>
                                </tr>
                            </Fragment>)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <Td><span className='font-bold'>Итого:</span></Td>
                                <Td>{count(`first`)}</Td>
                                <Td>{count(`repeat`)}</Td>
                                <Td>{count(`total`)}</Td>
                            </tr>
                        </tfoot>
                    </table>
                </div> : <></>}
            </div >
        </AuthenticatedLayout >
    );
}
