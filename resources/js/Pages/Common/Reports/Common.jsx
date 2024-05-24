import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, usePage } from '@inertiajs/react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import moment from 'moment';
import Select from 'react-select';
import { useEffect } from 'react';
import paymethods from '@/data/paymethods';
import { useState } from 'react';
import { customStyles, Th, Td, CustomInput, DropdownIndicator, Navigate } from './Components';

setDefaultLocale(ru);
registerLocale('ru', ru);

export default (props) => {

    const {
        branch,
        pagetitle,
        auth,
        start = null,
        end = null,
        branches = { data: [] },
        specialists = { data: [] },
        books = { data: [] },
        directions = { data: [] },
        topups = { data: [] },
        specialist = null,
        direction = null,
        service = null,
        reports = [],
        report
    } = usePage().props

    const [services, setServices] = useState([])

    const { data, setData, get, processing, errors, reset, transform } = useForm({
        start: start && moment(start).isValid() ? new Date(start) : null,
        end: end && moment(end).isValid() ? new Date(end) : null,
        specialist: specialist,
        direction: direction,
        service: service
    });

    transform(data => ({
        ...data,
        start: moment(data.start).isValid() ? moment(data.start).format('YYYY-MM-DD') : null,
        end: moment(data.end).isValid() ? moment(data.end).format('YYYY-MM-DD') : null,
        specialist: data.specialist ? data.specialist.id : null,
        direction: data.direction ? data.direction.id : null,
        service: data.service ? data.service.id : null
    }))

    useEffect(() => {
        !direction || !data.direction || (data.direction && direction.id !== data.direction.id) && setData(prev => ({
            ...prev,
            service: null
        }))

        setServices(data.direction && data.direction.categories ? data.direction.categories.map(cat => {
            if (cat.services.length > 1)
                return {
                    label: cat.title,
                    options: cat.services
                }
            else if (cat.services.length) {
                return cat.services[0]
            } else {
                return {
                    label: cat.title,
                    options: []
                }
            }
        }) : null)
    }, [data.direction])

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route(`${auth.user.role.name}.reports.common`, {
            branch: branch.data.id
        }), {
            onSuccess: () => {

            }
        });
    }

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
        // books.data.map(book => sum += book.payments.length ? book.payments.at(-1).sum : 0)
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
                <form className={`my-6`} action="" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-[1fr_1fr_2fr_2fr] gap-4 mb-4">
                        <div className="flex flex-col gap-2">
                            <label>Начало периода:</label>
                            <DatePicker
                                customInput={<CustomInput />}
                                selected={data.start}
                                placeholderText="__.__.____"
                                dateFormat={`dd.MM.yyyy`}
                                onChange={(date) => setData('start', date)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Конец периода:</label>
                            <DatePicker
                                customInput={<CustomInput />}
                                selected={data.end}
                                placeholderText="__.__.____"
                                dateFormat={`dd.MM.yyyy`}
                                onChange={(date) => setData('end', date)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Cпециалист:</label>
                            <Select
                                getOptionLabel={el => el.fullName}
                                getOptionValue={el => el.id}
                                styles={customStyles}
                                isClearable={true}
                                components={{ DropdownIndicator }}
                                options={specialists.data}
                                value={specialists.data.find(el => data.specialist && el.id == data.specialist.id)}
                                onChange={value => setData(prev => ({
                                    ...prev,
                                    specialist: value
                                }))}
                                placeholder="Выбрать из списка"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label>Направление:</label>
                            <Select
                                getOptionLabel={el => el.title}
                                getOptionValue={el => el.id}
                                styles={customStyles}
                                isClearable={true}
                                components={{ DropdownIndicator }}
                                options={directions.data}
                                value={directions.data.find(el => data.direction && el.id == data.direction.id)}
                                onChange={value => setData(prev => ({
                                    ...prev,
                                    direction: value
                                }))}
                                placeholder="Выбрать из списка"
                            />
                        </div>

                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        {services ? <>
                            <label>Услуга:</label>
                            <Select
                                getOptionLabel={el => el.title}
                                getOptionValue={el => el.id}
                                styles={customStyles}
                                isClearable={true}
                                components={{ DropdownIndicator }}
                                options={services}
                                value={data.service ? services.find(el => data.service && el.id == data.service.id) : null}
                                onChange={value => setData(prev => ({
                                    ...prev,
                                    service: value
                                }))}
                                placeholder="Выбрать из списка"
                            />
                        </> : <></>}
                    </div>
                    <div className="flex justify-end">
                        <PrimaryButton disabled={processing} size="">Сформировать отчет</PrimaryButton>
                    </div>

                </form>


                {books.data.length ? <div className="overflow-auto">
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
                </div> : <></>}



                <h3 className="text-lg my-4 font-medium">Отчет по балансу</h3>
                {topups.data.length ? <div className="overflow-auto">
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
                </div> : <></>}
            </div >
        </AuthenticatedLayout >
    );
}
