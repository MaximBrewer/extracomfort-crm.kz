import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Fragment } from 'react';
import { Th, Td, Navigate } from './Components';
import Filter from './Filter';

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
                    <table className="mt-6 table-auto w-full mb-4 text-xs">
                        <thead>
                            <tr>
                                <Th className="text-left">дата</Th>
                                <Th className="text-left">специалист</Th>
                                <Th className="text-left">оказанная услуга</Th>
                                <Th className="text-left">оплата</Th>
                                <Th className="text-left">администратор, сделавший запись</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.data.map((result, rdx) => <Fragment key={rdx}>
                                <tr>
                                    <Td>{result.date}</Td>
                                    <Td>{result.specialist}</Td>
                                    <Td>{result.service}</Td>
                                    <Td>{result.pay}</Td>
                                    <Td>{result.recieption}</Td>
                                </tr>
                            </Fragment>
                            )}
                        </tbody>
                    </table>
                </div> : <></>}
            </div >
        </AuthenticatedLayout >
    );
}
