import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Fragment } from 'react';
import { Th, Td, Navigate } from './Components';
import Filter from './Filter';

export default (props) => {

    const {
        pagetitle,
        results = { data: [] }
    } = props

    const getQuantity = () => {
        let quantity = 0;
        results.data.map(result => result.categories.map(cetagory => cetagory.services.map(service => quantity += service.quantity)))
        return quantity;
    }

    const getSum = () => {
        let sum = 0;
        results.data.map(result => result.categories.map(cetagory => cetagory.services.map(service => sum += service.sum)))
        return sum;
    }

    console.log(results)

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
                                <Th rowSpan={1}>услуга</Th>
                                <Th rowSpan={1}>цена</Th>
                                <Th rowSpan={1}>количество полученных услуг</Th>
                                <Th rowSpan={1}>сумма c учетом скидки</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.data.map((result, rdx) => <Fragment key={rdx}>
                                {result.sum ? <>
                                    <tr><Th colSpan={5}>{result.title}</Th></tr>
                                    {result.categories ? result.categories.map((cetagory, cdx) => <Fragment key={cdx}>{cetagory.services.map((service, sdx) => service.quantity ? <tr key={sdx}>
                                        <Td>{service.id}</Td>
                                        <Td>{service.title}</Td>
                                        <Td className={`text-center`}>{service.price}</Td>
                                        <Td className={`text-center`}>{service.quantity}</Td>
                                        <Td className={`text-center`}>{service.sum}</Td>
                                    </tr> : '')}</Fragment>) : <></>}
                                    <tr>
                                        <Td colSpan={3} className={`text-right font-bold text-sm`}>Итого:</Td>
                                        <Td colSpan={1} className={`text-center`}>{result.quantity}</Td>
                                        <Td colSpan={1} className={`text-center`}>{result.sum}</Td>
                                    </tr>
                                </> : <>
                                </>}
                            </Fragment>)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <Td colSpan={3} className={`text-right font-bold text-sm`}>Итого по филиалу:</Td>
                                <Td colSpan={1} className={`text-center`}>{getQuantity()}</Td>
                                <Td colSpan={1} className={`text-center`}>{getSum()}</Td>
                            </tr>
                        </tfoot>
                    </table>
                </div> : <></>}
            </div >
        </AuthenticatedLayout >
    );
}
