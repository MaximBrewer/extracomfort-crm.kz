import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import paymethods from '@/data/paymethods';
import { Th, Td, Navigate } from './Components';
import Filter from './Filter';

export default (props) => {

    const {
        pagetitle,
        books = { data: [] },
        topups = { data: [] },
    } = props

    const countServicePrice = () => {
        let sum = 0;
        books.data.map(el => sum += 1 * el.service.price)
        return sum;
    }

    const countServiceDiscoutPrice = () => {
        let sum = 0;
        books.data.map(book => sum += book.payments.length ? book.payments.at(-1).sum : 0)
        return sum;
    }

    const countCashRegister = () => {
        let sum = 0;
        books.data.map(book => sum += book.payments.length && book.payments.at(-1).method !== 'balance' && book.payments.at(-1).method !== 'free' ? book.payments.at(-1).sum : 0)
        return sum;
    }

    const countBalance = () => {
        let sum = 0;
        books.data.map(book => sum += book.payments.length && book.payments.at(-1).method === 'balance' ? book.payments.at(-1).sum : 0)
        return sum;
    }

    const countFromBalance = () => {
        let sum = 0;
        books.data.map(book => sum += book.payments.length && book.payments.at(-1).method === 'balance' ? book.payments.at(-1).sum : 0)
        return sum;
    }

    const countNonCache = () => {
        let sum = 0;
        books.data.map(book => sum += book.payments.length
            && book.payments.at(-1).method !== 'cash'
            && book.payments.at(-1).method !== 'balance'
            && book.payments.at(-1).method !== 'free'
            ? book.payments.at(-1).sum
            : 0)
        return sum;
    }

    const countCash = () => {
        let sum = 0;
        books.data.map(book => sum += book.payments.length && book.payments.at(-1).method === 'cash' ? book.payments.at(-1).sum : 0)
        return sum;
    }

    const countDuty = () => {
        let sum = 0;
        books.data.map(book => sum += !book.payments.length ? book.service.price : 0)
        return sum;
    }

    const countFree = () => {
        let sum = 0;
        books.data.map(book => sum += book.payments.length && book.payments.at(-1).method === 'free' ? 1 : 0)
        return sum;
    }

    const countTopups = () => {
        let sum = 0;
        topups.data.map(topup => topup.sum > 0 && (sum += topup.sum))
        return sum;
    }

    const countWithdraw = () => {
        let sum = 0;
        topups.data.map(topup => topup.sum < 0 && (sum -= topup.sum))
        return sum;
    }

    const countRest = () => {
        return "";
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
                {
                    books.data.length ? <div className="overflow-auto">
                        <table className="mt-6 table-auto w-full mb-4 text-xs">
                            <thead>
                                <tr>
                                    <Th rowSpan={2}>дата</Th>
                                    <Th rowSpan={2}>фио пациента</Th>
                                    <Th rowSpan={2}>услуга</Th>
                                    <Th rowSpan={2}>стоимость услуги</Th>
                                    <Th rowSpan={2}>стоимость услуги со скидкой</Th>
                                    <Th rowSpan={2}>тип оплаты</Th>
                                    <Th rowSpan={2}>оплата в кассу</Th>
                                    <Th rowSpan={2}>оплата с баланса</Th>
                                    <Th colSpan={5}>Итого поступление в кассу</Th>
                                </tr>
                                <tr>
                                    <Th>нал</Th>
                                    <Th>безнал</Th>
                                    <Th>с баланса</Th>
                                    <Th>долг</Th>
                                    <Th>без оплаты</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.data.map((book, cdx) => <tr key={cdx}>
                                    <Td>{book.date}</Td>
                                    <Td>{book.patient.fullName}</Td>
                                    <Td>{book.service.title}</Td>
                                    <Td>{book.service.price}</Td>
                                    <Td>{book.payments.length ? book.payments.at(-1).sum : ""}</Td>
                                    <Td>{book.payments.length ? paymethods.data.find(el => el.code === book.payments.at(-1).method).title : ''}</Td>
                                    <Td>{book.payments.length && book.payments.at(-1).method !== 'balance' && book.payments.at(-1).method !== 'free' ? book.payments.at(-1).sum : ""}</Td>
                                    <Td>{book.payments.length && book.payments.at(-1).method === 'balance' ? book.payments.at(-1).sum : ""}</Td>
                                    <Td>{book.payments.length && book.payments.at(-1).method === 'cash' ? book.payments.at(-1).sum : ""}</Td>
                                    <Td>{book.payments.length
                                        && book.payments.at(-1).method !== 'cash'
                                        && book.payments.at(-1).method !== 'balance'
                                        && book.payments.at(-1).method !== 'free'
                                        ? book.payments.at(-1).sum : ""}</Td>
                                    <Td>{book.payments.length && book.payments.at(-1).method === 'balance' ? book.payments.at(-1).sum : ""}</Td>
                                    <Td>{!book.payments.length ? book.service.price : ""}</Td>
                                    <Td>
                                        <div className={`flex justify-center`}>{book.payments.length && book.payments.at(-1).method === 'free' ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg> : ""}</div>
                                    </Td>
                                </tr>)}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <Td colSpan={3}></Td>
                                    <Td>{countServicePrice()}</Td>
                                    <Td>{countServiceDiscoutPrice()}</Td>
                                    <Td colSpan={1}></Td>
                                    <Td>{countCashRegister()}</Td>
                                    <Td>{countBalance()}</Td>
                                    <Td>{countCash()}</Td>
                                    <Td>{countNonCache()}</Td>
                                    <Td>{countFromBalance()}</Td>
                                    <Td>{countDuty()}</Td>
                                    <Td>{countFree()}</Td>
                                </tr>
                            </tfoot>
                        </table>
                    </div> : <></>
                }
                <h3 className="text-lg my-4 font-medium">Отчет по балансу</h3>
                {
                    topups.data.length ? <div className="overflow-auto">
                        <table className="table-auto w-full mb-16 text-xs">
                            <thead>
                                <tr>
                                    <Th>ФИО пациента</Th>
                                    <Th>дата</Th>
                                    <Th>Внесение</Th>
                                    <Th>Возврат</Th>
                                    <Th>Остаток</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {topups.data.map((topup, cdx) => <tr key={cdx}>
                                    <Td>{topup.fullName}</Td>
                                    <Td>{topup.created_at}</Td>
                                    <Td>{topup.sum > 0 ? topup.sum : ''}</Td>
                                    <Td>{topup.sum < 0 ? - topup.sum : ''}</Td>
                                    <Td>{topup.rest}</Td>
                                </tr>)}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td>{countTopups()}</Td>
                                    <Td>{countWithdraw()}</Td>
                                    <Td>{countRest()}</Td>
                                </tr>
                            </tfoot>
                        </table>
                    </div> : <></>
                }
            </div >
        </AuthenticatedLayout >
    );
}
